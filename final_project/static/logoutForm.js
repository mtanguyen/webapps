class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
    this.toggle = this.toggle.bind(this);
}

  toggle() {
    this.setState({isLoggedIn: !this.state.isLoggedIn});
  }

  handleSubmit(event) {
    event.preventDefault()
    
    $.ajax({
            type: 'POST',
            url: '/logout',
            data: JSON.stringify({
              isLoggedIn: this.state.isLoggedIn,
            }),
          
            success: function(response) {
                console.log(response);
                if(response.succeed){
                    if (response === "True") {
                        window.location.href = "/index.html";
                    } else if (response === "False"){
                        window.location.href = "/student.html";
                    } else {
                      window.location.href = "/instructor.html";
                    }
                }else{
                    // $('#errorMessageLogin').text('Incorrect email and/or password.')
                    console.log(response);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });   
  }

render() {
    return (
        <button type="submit" className="btn btn-block">Log Out</button>
      )}

'use strict';

const e = React.createElement;


const domContainer = document.querySelector('#logout_container');
ReactDOM.render(e(Logout), domContainer);