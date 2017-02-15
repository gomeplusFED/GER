import Report from './Report';


class GER extends Report {
    constructor(options) {
        super(options);
    }
    rewriteError() {
        window.onerror = function ( msg, url, line, col, error ) {
            var reportMsg = msg;
            if ( error.stack && error ) {
                console.log( reportMsg );
            }
            //console.log(newMsg);
            console.log( arguments );
        };
    }
}



export default GER;