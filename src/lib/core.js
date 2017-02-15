
import Report from './Report';
import utils from './utils';


class GER extends Report {
    constructor(options) {
        super(options);
        super();
    }
    rewriteError() {
    	let me = this;
        window.onerror = function ( msg, url, line, col, error ) {
        	
            var reportMsg = msg;
            if ( error.stack && error ) {
                reportMsg = me.handleErrorStack(error);
            }
            if (utils.typeDecide(reportMsg, "Event")) {
	            reportMsg += reportMsg.type ?
	                ("--" + reportMsg.type + "--" + (reportMsg.target ?
	                    (reportMsg.target.tagName + "::" + reportMsg.target.src) : "")) : "";
	        }
	        /*me.carryError({
	        	msg: reportMsg,
				rolNum: line,
				colNum: col,
				targetUrl: url
	        });
			me.send();
			me.trigger('afterReport');
	        */
            
        };
    }
    // 处理onerror返回的error.stack
    handleErrorStack( error ){
    	let stackMsg = error.stack;
    	let errorMsg = error.toString();
    	if( stackMsg.indexOf( errorMsg ) === -1 ){
    		stackMsg += '@';
    		stackMsg += errorMsg;
    	}
    	return stackMsg;
    }

}



export default GER;