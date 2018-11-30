// Source: http://4youngpadawans.com/download-file-from-server-react-and-spring/
// Date pulled: 11/30/2018 

import React, { Component } from 'react';
import { FileService } from '../services/file-service.jsx';
import { Button } from 'primereact/components/button/Button';
import { saveAs } from 'file-saver';

class DownloadFile extends Component {
    constructor() {
        super();
        this.fileService = new FileService();
        this.state = {downloading: false};
        this.handleDownload = this.handleDownload.bind(this);

    }

    extractFileName = (contentDispositionValue) => {
         var filename = "";
         if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
             var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
             var matches = filenameRegex.exec(contentDispositionValue);
             if (matches != null && matches[1]) {
                 filename = matches[1].replace(/['"]/g, '');
             }
         }
         return filename;
     }

    handleDownload(event) {    
    $.ajax({
            type: 'GET',
            url: '/download/report',
            data: JSON.stringify({
              state: this.state.state,
            }),

            downloadFile = () => {
              this.setState({ downloading: true });
              let self = this;
              this.fileService.getFileFromServer("file").then((response) => {
                console.log("Response", response);
                this.setState({ downloading: false});
                //extract file name from Content-Disposition header
                var filename=this.extractFileName(response.headers['content-disposition']);
                console.log("File name",filename);
                //invoke 'Save As' dialog
                saveAs(response.data, filename);
            }).catch(function (error) {
            console.log(error);
            self.setState({ downloading: false });
            if (error.response) {
                console.log('Error', error.response.status);
            } else {
                console.log('Error', error.message);
            }
        });
    };
        
    event.preventDefault();
  }

    render() {
        console.log("state",this.state);
        return (
          <button label="Download file" onClick={this.downloadFile}>Download</button>
        )
    };
}

const domContainer = document.querySelector('#download_container');
ReactDOM.render(e(DownloadFile), domContainer);
