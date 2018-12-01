// Source: https://reactjs.org/docs/add-react-to-a-website.html
// Source: http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/
// Date pulled: 11/29/2018 
'use strict';
const e = React.createElement;

class Vote extends React.Component{
  constructor(props) {
    super(props);
    this.state = { vote: false };
    this.handleSubmitVote = this.handleSubmitVote.bind(this);
  }

  handleSubmitVote(event) {
    $.ajax({
            type: 'POST',
            url: '/vote',
            data: JSON.stringify({
              value: this.state.vote,
            }),
          
            success: function(response) {
                console.log(response);
                if(response.succeed === true){
                  console.log("true");
                }else{
                    console.log(response);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });   
    event.preventDefault();
  }

 render() {
    return e(
      'button',
      { onClick: () => this.setState({ vote: true }) },
    );
}

const domContainer = document.querySelector('#vote_container');
ReactDOM.render(e(Vote), domContainer);