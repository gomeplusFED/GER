
import Report from './Report';
import utils from './utils';


class GER extends Report {
    constructor(options) {
        super(options);
    }
    rewriteError() {
        window.onerror = ( msg, url, line, col, error ) => {
        	
            var reportMsg = msg;
            if ( error.stack && error ) {
                reportMsg = this.handleErrorStack(error);
            }
            if (utils.typeDecide(reportMsg, "Event")) {
	            reportMsg += reportMsg.type ?
	                ("--" + reportMsg.type + "--" + (reportMsg.target ?
	                    (reportMsg.target.tagName + "::" + reportMsg.target.src) : "")) : "";
	        }
	        this.carryError({
	        	msg: reportMsg,
				rolNum: line,
				colNum: col,
				targetUrl: url
	        });
			this.send();
			//me.trigger('afterReport');
	        
            
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