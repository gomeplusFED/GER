/**
 * @author suman
 * @fileoverview report
 * @date 20170215
 */
//import delay from './delay';
import utils from "./utils";
import Config from "./Config";
class Report extends Config {

    constructor(options) {
    	super(options);
        this.errorQueue = [];
        this.mergeTimeout = null;
    }
    // 手动上报
    error ( msg ) {
    	let that = this;
    	if( !msg ) {
    		console.log( 'error方法内 msg 参数为空');
    		return;
    	}
    	let errorMsg = {};
    	if ( utils.typeDecide( msg, 'String' )) {
    		errorMsg.msg = msg;
    		errorMsg.level = 5;
    	} else if ( utils.typeDecide( msg )) {
    		errorMsg = msg;
    		errorMsg.level = 5;
    	}
    	that.carryError(errorMsg);
    	that.send();
    }

    // 发送
    send(isNowReport) {
    	let that = this;
		let fn = () => {
			let parames = '';
			if( that.config.mergeReport ) {
    			// 合并上报
    			console.log('合并上报');
				for( let i=0; i < that.errorQueue.length; i++ ){
					let obj = that.errorQueue[i];
					if( obj ) {
						for( let name in obj ){
							if (obj.hasOwnProperty(name)) {
								parames += name + '=' + obj[name] + '&';
							}
						}
					}
					parames += '###';
					/*if( i != that.errorQueue.length-1 ){
						parames += '###';
					}*/
				}
				/*that.errorQueue.forEach( function (){

				});*/
			} else {
    			// 不合并上报
    			console.log('不合并上报');
				if ( that.errorQueue.length ) {
					let obj = that.errorQueue[0];
					for( let name in obj ){
						if (obj.hasOwnProperty(name)) {
							parames += name + '=' + obj[name] + '&';
						}
					}
				}
			}
			that.config.url += '?' + parames;
			let oImg = new Image();
            oImg.src = that.config.url;
		};
		if( isNowReport ){
			// 延迟上报
			that.mergeTimeout = setTimeout( fn, that.config.delay );
		} else {
			// 现在上报
			fn();
		}
    }
    // push错误到pool
    carryError ( error ) {
    	//let that = this;
    	if( !error ) {
    		console.log('carryError方法内 error 参数为空');
    		return;
    	}
    	// 拿到onerror的参数 放数组中
    	this.errorQueue.push( error );
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

    // 手动上报 处理方法:全部立即上报 需要延迟吗?
    handleMsg ( msg, type, level ){
    	//let that = this;
    	if( !msg ) {
    		console.log( type + '方法内 msg 参数为空');
    		return;
    	}
    	let errorMsg = {};
    	if ( utils.typeDecide( msg, 'String' )) {
    		errorMsg.msg = msg;
    		errorMsg.level = level;
    	} else if ( utils.typeDecide( msg )) {
    		errorMsg = msg;
    		errorMsg.level = level;
    	}
    	this.carryError(errorMsg);
    	this.send();
    }
}

export default Report;