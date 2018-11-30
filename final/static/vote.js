// Source: https://reactjs.org/docs/add-react-to-a-website.html
// Source: http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/
// Date pulled: 11/29/2018 
'use strict';

class Vote extends React.Component{
  constructor(props) {
    super(props);
    this.state = { vote: false }
  }

}

handleSubmit = () => {
  render() {
    if (this.state.vote) {
      return 'This is the final submission.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ vote: true }) },
      'Submit'
    );
}

render() {
    return (
      <div class="form-group">
        <h1>Websites Voting Poll</h1>
        <label for="exampleFormControlSelect1">Rank #1</label>
        <div id="root"></div>
          <select>
            <option value="default">Default</option>
            <option value="one">Wesbite #1</option>
            <option value="two">Website #2</option>
            <option value="three">Website #3</option>
            <option value="four">Website #4</option>
            <option value="five">Website #5</option>
          </select>
        
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect2">Rank #2</label>
        <div id="root"></div>
          <select>
            <option value="default">Default</option>
            <option value="one">Wesbite #1</option>
            <option value="two">Website #2</option>
            <option value="three">Website #3</option>
            <option value="four">Website #4</option>
            <option value="five">Website #5</option>
          </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlSelect3">Rank #3</label>
        <div id="root"></div>
          <select>
            <option value="default">Default</option>
            <option value="one">Wesbite #1</option>
            <option value="two">Website #2</option>
            <option value="three">Website #3</option>
            <option value="four">Website #4</option>
            <option value="five">Website #5</option>
          </select>
      </div>
    );
  }
}


const e = React.createElement;
const domContainer = document.querySelector('#vote_container');
ReactDOM.render(Vote(), domContainer);
