// // Source: https://reactjs.org/docs/add-react-to-a-website.html
// // Source: https://medium.freecodecamp.org/how-to-create-file-upload-with-react-and-node-2aa3f9aab3f0
// // Source: https://www.zeolearn.com/magazine/connecting-reactjs-frontend-with-nodejs-backend
// // Date pulled: 11/29/2018 

import axios, { post } from 'axios';

'use strict';

const e = React.createElement;

class WebsitesFileUpload extends React.Component {
  constructor(props) {
    super(props);
    state = {selectedFile: null};
    this.fileChangedHandler= this.fileChangedHandler.bind(this);
    this.uploadHandler= this.uploadHandler.bind(this);

fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
}

uploadHandler = () => {
  const formData = new FormData()
  formData.append('myFile', this.state.selectedFile, this.state.selectedFile.name)
  axios.post('http://localhost:8080/upload/websites', formData)
}

  render() {
    return (
      <input type="file" onChange={this.fileChangedHandler}>
      <button onClick={this.uploadHandler}>Upload</button>
    );
  }
}


const domContainer = document.querySelector('#upload_users_container');
ReactDOM.render(e(WebsitesFileUpload), domContainer);


