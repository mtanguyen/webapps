import sqlite3 as sql
import bcrypt
from base64 import b64encode
from uuid import uuid4


def dict_factory(cursor, row):
    """Makes SQL cursor return dictionary instead of tuple."""
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def create_con():
    """Connects to database and returns con and cur."""
    con = sql.connect("database.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    return con, cur


def create_sites_table():
    """Creates the sites table."""
    con, cur = create_con()
    cur.execute('CREATE TABLE IF NOT EXISTS sites('
                'username TEXT PRIMARY KEY);')
    con.commit()
    cur.close()
    con.close()


def get_sites():
    """Gets all of the sites."""
    con, cur = create_con()
    cur.execute('SELECT * FROM sites;')
    ret = cur.fetchall()
    cur.close()
    con.close()
    return ret


def add_sites_list(sites):
    """Adds list of sites to the database.
    Expected input is ['username',...]
    """
    if not sites:
        return sites

    bad_sites = []
    con, cur = create_con()
    for site in sites:
        try:
            cur.execute('INSERT INTO sites(username) VALUES (?);', (site,))
        except sql.IntegrityError or sql.OperationalError:
            bad_sites.append(site)

    con.commit()
    cur.close()
    con.close()
    return bad_sites


def create_votes_table():
    """Creates the votes table."""
    con, cur = create_con()
    cur.execute('CREATE TABLE IF NOT EXISTS votes('
                'username TEXT NOT NULL,'
                'votenum INTEGER NOT NULL,'
                'sitename TEXT NOT NULL,'
                'PRIMARY KEY (username, votenum),'
                'FOREIGN KEY (username) REFERENCES users(username),'
                'FOREIGN KEY (sitename) REFERENCES sites(username));')


def add_vote(username, votenum, sitename):
    """Adds a vote for the user."""
    con, cur = create_con()
    try:
        cur.execute('INSERT INTO votes(username, votenum, sitename) VALUES (?, ?, ?);',
                    (username, votenum, sitename))
    except sql.IntegrityError:
        con.rollback()
        cur.close()
        con.close()
        update_vote(username, votenum, sitename)

    con.commit()
    cur.close()
    con.close()


def update_vote(username, votenum, sitename):
    """Changes the user's vote."""
    con, cur = create_con()
    cur.execute('UPDATE votes SET sitename=? WHERE username=? AND votenum=?;',
                (sitename, username, votenum))
    con.commit()
    cur.close()
    con.close()


def get_users_votes():
    """Gets each user and what they voted for."""
    con, cur = create_con()
    cur.execute('SELECT users.username, T1.v1, T2.v2, T3.v3 '
                'FROM users LEFT JOIN '
                '(SELECT username, sitename AS v1 FROM votes WHERE votenum=1) AS T1 '
                'ON T1.username=users.username LEFT JOIN '
                '(SELECT username, sitename AS v2 FROM votes WHERE votenum=2) AS T2 '
                'ON T1.username=T2.username LEFT JOIN '
                '(SELECT username, sitename AS v3 FROM votes WHERE votenum=3) AS T3 '
                'ON T1.username=T3.username;')

    ret = cur.fetchall()
    cur.close()
    con.close()
    return ret


def get_ranking():
    """Gets the ranking of each site.
    Vote 1 is worth 3 points,
    Vote 2 is worth 2 points,
    Vote 3 is worth 1 point.
    """
    con, cur = create_con()
    cur.execute('SELECT Sites.username, COALESCE(SUM(T.val), 0) AS points '
                'FROM Sites LEFT JOIN (SELECT sitename, (CASE '
                'WHEN Votes.votenum=1 THEN 3 '
                'WHEN Votes.votenum=2 THEN 2 '
                'WHEN Votes.votenum=3 THEN 1 '
                'ELSE 0 END) AS val FROM Votes) as T '
                'ON Sites.username=T.sitename '
                'GROUP BY T.sitename, Sites.username '
                'ORDER BY points DESC;')

    ret = cur.fetchall()
    cur.close()
    con.close()
    return ret


def create_users_table():
    """Creates the users table."""
    con, cur = create_con()
    cur.execute('CREATE TABLE IF NOT EXISTS users('
                'username TEXT PRIMARY KEY,'
                'password TEXT NOT NULL,'
                'role TEXT NOT NULL);')
    con.commit()
    cur.close()
    con.close()


def add_user(username, password, role):
    """Adds a single user to the database."""
    if None in (username, password):
        return False

    con, cur = create_con()
    hashed_pass = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    in_role = 'student'
    if role in ('admin', 'instructor', 'teacher'):
        in_role = 'admin'
    try:
        cur.execute('INSERT INTO users(username, password, role)'
                    'VALUES (?, ?, ?);', (username, hashed_pass, in_role))
    except sql.IntegrityError:
        con.rollback()
        cur.close()
        con.close()
        return False

    con.commit()
    cur.close()
    con.close()
    return True


def add_user_list(users):
    """Adds a list of users to the database.
    Expected form: [(username, password, role),...]
    """
    if not users:
        return []

    bad_users = []

    con, cur = create_con()
    for user in users:
        hashed_pass = bcrypt.hashpw(user[1].encode(), bcrypt.gensalt())
        role = 'student'
        if user[2].lower() in ('admin', 'instructor', 'teacher'):
            role = 'admin'

        try:
            cur.execute('INSERT INTO users(username, password, role)'
                        'VALUES (?, ?, ?);', (user[0], hashed_pass, role))
        except sql.IntegrityError:
            bad_users.append(user)

    con.commit()
    cur.close()
    con.close()
    return bad_users


def is_admin(username):
    """Returns whether user is an admin, based on username."""
    con, cur = create_con()
    cur.execute('SELECT role FROM users WHERE username=?;', (username,))
    role = cur.fetchone()['role']
    cur.close()
    con.close()
    return role.lower() == 'admin'


def password_matches(username, password):
    """Returns whether the plaintext password matches the hashed password."""
    con, cur = create_con()
    cur.execute('SELECT password FROM users WHERE username=?;', (username,))
    ret = cur.fetchone()
    if ret is None:
        return False
    hashed = ret['password']
    cur.close()
    con.close()
    return bcrypt.checkpw(password.encode(), hashed)


def create_sessions_table():
    """Creates the sessions table to store tokens and usernames.
    On each reboot of the server, previous tokens are deleted.
    """
    con, cur = create_con()
    cur.execute('DROP TABLE IF EXISTS sessions;')
    con.commit()
    cur.execute('CREATE TABLE IF NOT EXISTS sessions('
                'token TEXT PRIMARY KEY,'
                'username TEXT NOT NULL,'
                'FOREIGN KEY(username) REFERENCES users(username));')
    con.commit()
    cur.close()
    con.close()


def get_user_from_token(token):
    """Returns the username and role of a user based on their session token."""
    con, cur = create_con()
    cur.execute('SELECT users.username, users.role '
                'FROM users NATURAL JOIN sessions '
                'WHERE sessions.token=?;', (token,))
    ret = cur.fetchone()
    if ret is None:
        return None
    return ret['username'], ret['role']


def add_user_session(username):
    """Generates a token for a user and adds that token and username to the sesssions."""
    token = b64encode(uuid4().bytes).decode()
    con, cur = create_con()
    cur.execute('INSERT INTO sessions(username, token) VALUES (?, ?);', (username, token))
    con.commit()
    cur.close()
    con.close()
    return token


def del_user_session(token):
    """Removes the token from the sessions."""
    con, cur = create_con()
    cur.execute('DELETE FROM sessions WHERE token=?;', (token,))
    con.commit()
    cur.close()
    con.close()
