from flask import Flask, request, session, jsonify, send_from_directory, send_file
from db import *
from random import shuffle
import zipfile
from os import walk
from tempfile import TemporaryFile

app = Flask(__name__)
app.secret_key = b64encode(uuid4().bytes).decode()
create_sites_table()
create_users_table()
add_user('admin', 'admin', 'admin')
create_votes_table()
create_sessions_table()


@app.route('/', methods=['GET'])
def landing():
    """Main page for web app, routes to index.html."""
    return send_from_directory('static', 'index.html')


@app.route('/register', methods=['POST'])
def register():
    """For registering a single user."""

    # Check that username was supplied
    if 'username' not in request.get_json(force=True):
        return jsonify(succeed=False, error='username not received'), 400

    username = request.get_json(force=True)['username']

    # Check that password was supplied
    if 'password' not in request.get_json(force=True):
        return jsonify(succeed=False, error='password not received'), 400

    password = request.get_json(force=True)['password']

    # Check optional role field
    role = None
    if 'role' in request.get_json(force=True):
        role = request.get_json(force=True)['role']

    # Add user and return whether it succeeded
    if add_user(username, password, role):
        return jsonify(succeed=True)

    return jsonify(succeed=False), 500


@app.route('/login', methods=['POST'])
def login():
    """Handles login post requests.
    On successful login, session, token, and username cookies are set.
    session cookie is for Flask to track session variables.
    token cookie is to check active session to get user from database.
    username cookie is set for frontend ease of development.
    """

    # Check that username was supplied
    if 'username' not in request.get_json(force=True):
        return jsonify(succeed=False, error="username not received"), 400

    username = request.get_json(force=True)['username']

    # Check that password was supplied
    if 'password' not in request.get_json(force=True):
        return jsonify(succeed=False, error="password not received"), 400

    password = request.get_json(force=True)['password']

    # Check that the password matches the hashed password in the database
    if password_matches(username, password):
        token = add_user_session(username)
        session['username'] = username
        session['token'] = token
        role = "student"
        if is_admin(username):
            role = "admin"
        return jsonify(succeed=True, role=role)

    return jsonify(succeed=False, error="password does not match"), 403


@app.route('/logout', methods=['POST'])
def logout():
    """Deletes session cookies and removes session from database."""
    token = session.get('token')
    del_user_session(token)
    session.clear()
    return jsonify(succeed=True)


@app.route('/vote', methods=['POST'])
def vote():
    """Submits a vote for the user.
    If a vote already exists for a user, this will overwrite the previous vote.
    """

    # Get user from session token
    token = session.get('token')
    user = get_user_from_token(token)
    if user is None:
        return jsonify(succeed=False), 403

    # Get votes from request
    req = request.get_json()
    v1 = req.get('v1')
    v2 = req.get('v2')
    v3 = req.get('v3')

    # Add votes to database
    if v1 is not None:
        add_vote(user[0], 1, v1)

    if v2 is not None:
        add_vote(user[0], 2, v2)

    if v3 is not None:
        add_vote(user[0], 3, v3)

    return jsonify(succeed=True)


@app.route('/websites', methods=['GET'])
def get_websites():
    """Returns a randomized list of websites for the student to view."""
    sites = get_sites()
    shuffle(sites)
    return jsonify(websites=sites, succeed=True)


@app.route('/upload/users', methods=['POST'])
def upload_users():
    """Allows upload of a user credential .csv file."""

    # Ensure that file is in request
    if 'file' not in request.files:
        return jsonify(succeed=False, error="no file uploaded"), 400

    file = request.files['file']

    # Ensure that file is a .csv file
    if file.filename.rsplit('.', 1)[1].lower() != 'csv':
        return jsonify(succeed=False, error="bad file extension: expecting .csv"), 400

    users = []

    # Read each line of the file, and append user tuples to 'users' list
    line = file.stream.readline().decode('utf-8-sig')
    line = file.stream.readline().decode('utf-8-sig')
    while line:
        line = line.strip()

        if len(line.split(',')) != 3:
            return jsonify(succeed=False, error="malformed .csv file"), 400
        users.append(tuple(line.split(',')))
        line = file.stream.readline().decode('utf-8-sig')

    # Add users to database, and get any that could not be added (already exist)
    bad_users = add_user_list(users)

    # If there are any users that failed, return error with users that failed
    if bad_users:
        return jsonify(succeed=False, error="at least 1 user failed to add", users=bad_users), 400

    return jsonify(succeed=True)


@app.route('/upload/websites', methods=['POST'])
def upload_websites():
    if 'file' not in request.files:
        return jsonify(succeed=False, error="no file uploaded"), 400

    file = request.files['file']

    if file.filename.rsplit('.', 1)[1].lower() != 'zip':
        return jsonify(succeed=False, error="bad file extension: expecting .zip"), 400

    file.save('./upload/sites.zip')

    with zipfile.ZipFile('./upload/sites.zip', 'r') as zip_ref:
        zip_ref.extractall('./static/sites/')

    sites = next(walk('./static/sites'))[1]
    print(sites)
    add_sites_list(sites)

    return jsonify(succeed=True)


@app.route('/download/report', methods=['GET'])
def download_report():
    token = session.get('token')
    user = get_user_from_token(token)
    if user is None:
        return jsonify(succeed=False, error="must be logged in"), 403
    if user[1].lower() != "admin":
        return jsonify(succeed=False, error="insufficient permissions"), 403

    report = get_users_votes()
    csv = "USERNAME,VOTE #1,VOTE #2,VOTE #3\n"
    for user in report:
        csv = csv + "%s,%s,%s,%s\n" % (user['username'], user['v1'], user['v2'], user['v3'])

    with TemporaryFile('w+b') as tf:
        tf.write(csv.encode())
        tf.seek(0)
        return send_file(tf, as_attachment=True, attachment_filename="report.csv")


@app.route('/report/sites', methods=['GET'])
def get_site_report():
    token = session.get('token')
    user = get_user_from_token(token)
    if user is None:
        return jsonify(succeed=False, error="must be logged in"), 403
    if user[1].lower() != "admin":
        return jsonify(succeed=False, error="insufficient permissions"), 403

    return jsonify(report=get_ranking(), succeed=True)


@app.route('/report/users', methods=['GET'])
def get_user_report():
    token = session.get('token')
    user = get_user_from_token(token)
    if user is None:
        return jsonify(succeed=False, error="must be logged in"), 403
    if user[1].lower() != "admin":
        return jsonify(succeed=False, error="insufficient permissions"), 403

    return jsonify(report=get_users_votes(), succeed=True)


@app.route('/<path:path>')
def file_server(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(port=8080)
