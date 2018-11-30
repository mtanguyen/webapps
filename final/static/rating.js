// Source: https://reactjs.org/docs/forms.html
// Date pulled: 11/28/2018 
class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'default'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // handleSubmit(event) {
  //   alert(this.state.value);
  //   event.preventDefault();
  // }

  handleSubmit(event) {
    $.ajax({
            type: 'POST',
            url: '/vote',
            data: JSON.stringify({
              value: this.state.value,
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
    return (
      <form>
      <div class="form-group">
        <h1>Websites Voting Poll</h1>
        <label for="exampleFormControlSelect1">Rank #1</label>
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
          <select>
            <option value="default">Default</option>
            <option value="one">Wesbite #1</option>
            <option value="two">Website #2</option>
            <option value="three">Website #3</option>
            <option value="four">Website #4</option>
            <option value="five">Website #5</option>
          </select>
      </div>
    </form>
    );
  }
}

'use strict';

const e = React.createElement;

const domContainer = document.querySelector('#rating_container');
ReactDOM.render(e(Rating), domContainer);




