class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({username: event.target.value});
  }

  handleChangePass(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    
    $.ajax({
            type: 'POST',
            url: '/login',
            data: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            }),
          
            success: function(response) {
                console.log(response);
                if(response.succeed){
                //     localStorage.setItem('userdata', JSON.stringify(response.user));
                //     $('#loginComponent').hide();
                //     let user = JSON.parse(localStorage.getItem('userdata'));
                //     console.log(user);
                //     if (user.role.toUpperCase() === 'IT') {
                //         $('#itHome').show();
                //         getUnassignedTable();
                //     }
                //     else
                //         $('#userHome').show();
                //     populateUser();
                //     getAssignedTable();
//                  console.log("true");
                    if (response.role === "admin") {
                        window.location.href = "/instructor.html";
                    } else {
                        window.location.href = "/student.html";
                    }
                }else{
                    $("#incorrectLogin").show();
                }
            },
            error: function(error) {
                $("#incorrectLogin").show();
            }
        });   
  }

  render() {
    var divStyle = {
      textAlign: 'center',
      display: 'none'
    };
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <div id="incorrectLogin" className="alert alert-danger" role="alert" style={divStyle}>
          Incorrect Login
        </div>
          <div className="form-group">
            <label htmlFor="usernameInput">Username</label>
            <input type="text" className="form-control" id="usernameInput"  placeholder="Username" value={this.state.username} onChange={this.handleChangeUser} />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password} onChange={this.handleChangePass} />
          </div>
        
        <button type="submit" className="btn btn-block">Submit</button>
      </form>
    );
  }
}

'use strict';

const e = React.createElement;


const domContainer = document.querySelector('#login_container');
ReactDOM.render(e(Login), domContainer);