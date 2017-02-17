/**
 * @author  zdongh2016
 * @fileoverview GER
 * @date 2017/02/15
 */
import Report from './Report';
import utils from './utils';


class GER extends Report {
    constructor() {
        super();
        this.rewriteError();
    }
    rewriteError() {
        window.onerror = ( msg, url, line, col, error ) => {
            if( this.trigger('error',arguments)){
                return false;
            }
            var reportMsg = msg;
            if ( error.stack && error ) {
                reportMsg = this.handleErrorStack( error );
            }
            if ( utils.typeDecide( reportMsg, "Event" ) ) {
                reportMsg += reportMsg.type ?
                    ( "--" + reportMsg.type + "--" + ( reportMsg.target ?
                        ( reportMsg.target.tagName + "::" + reportMsg.target.src ) : "" ) ) : "";
            }
            this.error({
                msg: reportMsg,
                rolNum: line,
                colNum: col,
                targetUrl: url
            });
            return true;
        };
    }
    // 处理onerror返回的error.stack
    handleErrorStack( error ) {
        let stackMsg = error.stack;
        let errorMsg = error.toString();
        if ( stackMsg.indexOf( errorMsg ) === -1 ) {
            stackMsg += '@';
            stackMsg += errorMsg;
        }
        return stackMsg;
    }

}



export default GER;