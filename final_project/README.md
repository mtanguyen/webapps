# Student Site Rating Site

Website Grader is a website designed to allow instructors and TAs to manage student web projects by uploading a CSV file of usernames, passwords and roles, a zipped file of all students' projects, and downloads voting results. Students will have a dashboard to rate each other's projects.

### Prerequisites

Python 3

### Installing
On Windows OS: Install flask and passlib python libraries.

```
pip install flask

pip install bcrypt
```

On MacOS and Linux: To install flask, go here: http://flask.pocoo.org/docs/1.0/installation/. If the other site above doesn't work, go here: http://flask.pocoo.org/docs/0.12/installation/

## Deployment

Run python server.py on terminal or command prompt.

Your server will now be running on localhost port 8080.

To view this app in a browser on the machine it is running, go to the url http://localhost:8080

Once you are on the localhost, log in as an admin to start the database off. Go to your site running on port 8080 and log in with the following credentials:

* username: admin

* password: admin

Once logged in, access the instructor dashboard to upload a CSV file for users login credentials. As an instructor or TA, another feature is to add a zipped file of the sites. At the bottom, instructors and TAs can see the voting poll and download a CSV report. 

For the student dashboard, you will see different sites and vote. Note: Students can only vote once. 

## Administration

The logins csv upload is expecting data in the following format: 
```
username,password,role
myusername,mypassword,myrole 
myusername2,mypassword2,myrole2 
etc.
```
Note: The logins CSV must have the first row as described.


The sites zip upload is expecting a zip file in the following format:

```
sites.zip 
|  student1 
|  |  index.html 
|  |  style.css 
|  student2 
|  |  index.html 
|  etc.
```

Note: Any instructor account can add new logins to the database. The pre-existing admin account (given above) is to get the website going as the site administrator. 

Once you have your accounts uploaded, you can use the site.

## Built With

* [Python](https://www.python.org) - Back-end server client library
* [Flask](http://flask.pocoo.org/) - Back-end server client library
* [mySQL](https://www.mysql.com) - Database to store information
* [Bootstrap](https://getbootstrap.com/) - Front-end style library
* [React](https://reactjs.org) - Front-end web interface 
* [HTML/CSS/JS] - Front-end style library

## Authors

* **Ashton Honneggar** - Back-end design - [AshtonHoneggar](https://github.com/AshtonHoneggar)
* **Belanna Marconi** - Front-end development -
  [bimarconi](https://github.com/bimarconi)
* **My Nguyen** - Front-end development - [mtanguyen](https://github.com/mtanguyen)
* **Blanche Pinto** - Front-end development -
  [blanche-pinto](https://github.com/blanche-pinto)
