/**
 * @author suman
 * @fileoverview report
 * @date 20170215
 */
//import delay from './delay';
import utils from "./utils";

class Report {

	constructor() {
		this.errorQueue = [];
    }

    // 手动上报
    error ( msg ) {
    	if ( utils.typeDecide( msg, 'String' )) {
    		console.log(1);
    	} else if ( utils.typeDecide( msg )) {
    		console.log(1);
    	}
    }

    // 发送
    send () {

    }

    // push错误到pool
    carryError ( error ) {
    	if( !error ) {
    		console.log('carryError方法内 error 参数为空');
    		return;
    	}
    	// 拿到onerror的参数 放数组中
    	this.errorQueue.push( error );
    }

    // 延迟上报
    delayReport () {

    }

    // info
    info ( msg ) {
    	this.handleMsg ( msg, 'info', 1 );
    }

    // log
    log ( msg ) {
    	this.handleMsg ( msg, 'log', 2 );
    }

    // warn
    warn ( msg ) {
    	this.handleMsg ( msg, 'warn', 3 );
    }

    // debug
    debug ( msg ) {
    	this.handleMsg ( msg, 'debug', 4 );
    }

    handleMsg ( msg, fnName, level ){
    	if( !msg ) {
    		console.log( fnName + '方法内 msg 参数为空');
    		return;
    	}
    	var errorMsg = {};
    	if ( utils.typeDecide( msg, 'String' )) {
    		errorMsg.meg = msg;
    		errorMsg.level = level;
    	} else if ( utils.typeDecide( msg )) {
    		errorMsg = msg;
    		errorMsg.level = level;
    	}
    	this.carryError(errorMsg);
    }
}

export default Report;