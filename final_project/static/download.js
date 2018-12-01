//// Source: http://4youngpadawans.com/download-file-from-server-react-and-spring/
//// Date pulled: 11/30/2018 
//
//class DownloadFile extends Component {
//    constructor() {
//        super();
//        this.handleDownload = this.handleDownload.bind(this);
//    }
//
//    handleDownload(event) {    
//        event.preventDefault();
//
////        $.ajax({
////            type: 'GET',
////            url: '/download/report',
////            data: null,
////            success: (response) => {
////                // TODO: add text to show file has been downloaded
////                console.log("donwloaded");
////            },
////            error: (response) => {
////                // TODO: add text to show there was an error
////                console.log(response);
////            }
////        });
//    }
//
//    render() {
//        return (
//          <a className="btn" href="/download/report" target="_blank">Download</a>
//        )
//    };
//}
//
//'use strict';
//
//const e = React.createElement;
//
//const domContainer = document.querySelector('#download_container');
//ReactDOM.render(e(DownloadFile), domContainer);
