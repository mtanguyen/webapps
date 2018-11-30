// Source: https://reactjs.org/docs/add-react-to-a-website.html
// Source: https://medium.freecodecamp.org/how-to-create-file-upload-with-react-and-node-2aa3f9aab3f0
// Source: https://www.zeolearn.com/magazine/connecting-reactjs-frontend-with-nodejs-backend
// Date pulled: 11/29/2018 

import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = { selectedFile: null, loaded: 0, }
    this.handleselectedFile = this.handleselectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

 //    fetch('http://localhost:4000/upload', {
 //    	method: 'POST', 
 //    	body: data}).then(response => {
 //    		response.json().then(body => {
 //    			this.setState({ fileURL: `http://localhost:4000/${body.file}` });
 //    		});
	// 	});
	// }

	axios.post('/files', data).then((response) => {
      this.setState({
        selectedFile: response.data.fileUrl
      })
    })
}


const domContainer = document.querySelector('#upload_container');
ReactDOM.render(Upload(), domContainer);


