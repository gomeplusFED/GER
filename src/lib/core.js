import events from './events';

class GER extends events {
    constructor() {
        super();
    }
    test() {
        window.onerror = function ( msg, url, line, col, error ) {
            var newMsg = msg;
            console.log( arguments, newMsg, error );
        };
    }
}

export default GER;