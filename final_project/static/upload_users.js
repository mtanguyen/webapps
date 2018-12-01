// // Source: https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513
// // Source: https://www.academind.com/learn/react/snippets/image-upload/
// // Source: https://www.zeolearn.com/magazine/connecting-reactjs-frontend-with-nodejs-backend
// // Date pulled: 11/29/2018 

'use strict';

const e = React.createElement;

class UsersFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this. state = {selectedFile: null};
        this.fileChangedHandler= this.fileChangedHandler.bind(this);
        this.uploadHandler= this.uploadHandler.bind(this);
    }
    
    fileChangedHandler(event) {
        this.setState({selectedFile: event.target.files[0]})
    }

    uploadHandler(event) {
        event.preventDefault();
        const formData = new FormData()
        formData.append('file', this.state.selectedFile, this.state.selectedFile.name)
        $.ajax({
            type: 'POST',
            url: '/upload/users',
            data: formData,
            contentType: false,
            processData: false,
            success: response => {
                console.log(response);
                if(response.succeed === true) {
                    $("#userSuccess").show();
                    $("#userFail").hide();
                } else {
                    $("#userSuccess").hide();
                    $("#userFail").show();
                }  
            },
            error: response => {
                console.log(response);
                $("#userSuccess").hide();
                $("#userFail").show();
            }
        });
    }

  render() {
    var divStyle = {
      textAlign: 'center',
      display: 'none'
    };
    return (
            <form encType="multipart/form-data" onSubmit={this.uploadHandler}>
                <input type="file" name="file" onChange={this.fileChangedHandler} />
                <input type="submit" className="btn btn-primary" value="Upload" />
                <div id="userSuccess" className="alert alert-primary" role="alert" style={divStyle}>
                    Upload Successful
                </div>
                <div id="userFail" className="alert alert-danger" role="alert" style={divStyle}>
                    Upload Failed
                </div>
            </form>
            
    );
  }
}

const domContainer = document.querySelector('#upload_users_container');
ReactDOM.render(e(UsersFileUpload), domContainer);
