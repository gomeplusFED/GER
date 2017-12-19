/**
 * @author  zdongh2016
 * @fileoverview GER
 * @date 2017/02/15
 */
//import 'babel-polyfill';
import utils from './utils';
import events from './events';
import config from './config';
import localStorage from './localStorage';
import report from './report';
import proxy from './proxy';
// utils.fixedObjDefined();
class GER extends events( localStorage( report( proxy( config ) ) ) ) {
    constructor( options ) {
        super( options );
        this.breadcrumbs = [];
        this.rewriteError();
        this.catchClickError();
    }
    rewriteError() {
        let defaultOnerror = window.onerror || utils.noop;
        window.onerror = ( msg, url, line, col, error ) => {
            //有些浏览器没有col
            col = col || ( window.event && window.event.errorCharacter ) || 0;
            if ( !this.trigger( 'error', utils.toArray( arguments ) ) ) {
                return false;
            }
            var reportMsg = msg;
            if ( error && error.stack ) {
                reportMsg = this.handleErrorStack( error );
            } else {
                //不存stack的话，对reportMsg做下处理 
                var ext = [];
                var f = arguments.callee.caller, // jshint ignore:line
                    c = 3;
                //这里只拿三层堆栈信息
                while ( f && ( c-- > 0 ) ) {
                    ext.push( f.toString() );
                    if ( f === f.caller ) {
                        break; //如果有环
                    }
                    f = f.caller;
                }
                if( ext.length > 0 ){
                    reportMsg += '@' + ext.join( ',' );
                }
            }
            if ( utils.typeDecide( reportMsg, "Event" ) ) {
                reportMsg += reportMsg.type ?
                    ( "--" + reportMsg.type + "--" + ( reportMsg.target ?
                        ( reportMsg.target.tagName + "::" + reportMsg.target.src ) : "" ) ) : "";
            }
            if( reportMsg ){
                this.error( {
                    msg: reportMsg,
                    rowNum: line,
                    colNum: col,
                    targetUrl: url,
                    level: 4,
                    breadcrumbs: JSON.stringify(this.breadcrumbs)
                } );
            }
            defaultOnerror.call( null, msg, url, line, col, error );
        };
    }
    // 处理onerror返回的error.stack
    handleErrorStack( error ) {
        let stackMsg = error.stack;
        let errorMsg = error.toString();
        if( errorMsg ){
            if ( stackMsg.indexOf( errorMsg ) === -1 ) {
                stackMsg += '@' + errorMsg;
            }
        }else{
            stackMsg = '';
        }
        return stackMsg;
    }
    catchClickError(){
      if(window.addEventListener){
        if('ontouchstart' in document.documentElement){
          window.addEventListener('touchstart', this._storeClcikedDom, !0)
        } else {
          window.addEventListener('click', this._storeClcikedDom, !0)
        }
      } else {
        document.attachEvent("onclick", this._storeClcikedDom);
      }
    }
    _storeClcikedDom = (ele) =>{
      const target = ele.target ? ele.target : ele.srcElement;
      let info = {
        time: new Date().getTime()
      };
      if(target){
        var outerHTML = target.outerHTML;
        outerHTML && outerHTML.length > 200 && (outerHTML = outerHTML.slice(0, 200));
        // 只保存不为空的属性
        outerHTML !== '' && (info.outerHTML = outerHTML);
        target.tagName !== '' && (info.tagName = target.tagName);
        target.id !== '' && (info.id = target.id);
        target.className !== '' && (info.className = target.className);
        target.name !== '' && (info.name = target.name);
      }
      this.breadcrumbs.push(info);
      this.breadcrumbs.length > 10 && this.breadcrumbs.shift();
    }
}

export default GER;