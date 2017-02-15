import events from './events';

class GER extends events {
    constructor() {
        super();
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