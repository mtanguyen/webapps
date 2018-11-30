// // Source: https://reactjs.org/docs/add-react-to-a-website.html
// // Source: https://medium.freecodecamp.org/how-to-create-file-upload-with-react-and-node-2aa3f9aab3f0
// // Source: https://www.zeolearn.com/magazine/connecting-reactjs-frontend-with-nodejs-backend
// // Date pulled: 11/29/2018 

//import axios, { post } from 'axios';
//

class WebsitesFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedFile: null};
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler= this.uploadHandler.bind(this);
  }
    
  fileChangedHandler(event) {
    console.log(event);
    this.setState({selectedFile: event.target.files[0]})
  }

    uploadHandler(event) {
        event.preventDefault();
      const formData = new FormData()
      formData.append('file', this.state.selectedFile, this.state.selectedFile.name)

        $.ajax({
            type: 'POST',
            url: '/upload/websites',
            data: formData,
            contentType: false,
            processData: false,
            success: response => {
                console.log(response);
            },
            error: response => {
                console.log(response);
            }
        });
    }

    render() {
        return (
            <form encType="multipart/form-data" onSubmit={this.uploadHandler}>
                <input type="file" name="file" onChange={this.fileChangedHandler} />
                <input type="submit" value="Upload" />
            </form>
        );
    }
}


'use strict';

const e = React.createElement;

const domContainer = document.querySelector('#upload_websites_container');
ReactDOM.render(e(WebsitesFileUpload), domContainer);
