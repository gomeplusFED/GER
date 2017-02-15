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
        /*['info','log','wran','debug','error'].forEach((type,index)=>{
            this[type] = (msg)=>{
                this.handleMsg ( msg, type, index );
            };
        }.bind(this));*/
        ['info','log','wran','debug','error'].forEach(function(type,index){
            
            this[type] = (msg)=>{
                //console.log(this,12343354)
                this.handleMsg ( msg, type, index );
            };  
        }.bind(this));
    }

    serializeObj(obj){
        let parames = '';
        Object.keys(obj).forEach(name=>{
            parames += name + '=' + obj[name] + '&';   
        });
        return parames;
    }

    // 发送
    send(isNowReport,cb) {
		let fn = () => {
            let parames = '';
            let queue = this.errorQueue;
			if( this.config.mergeReport ) {
    			// 合并上报
    			console.log('合并上报');
                parames = queue.map(obj =>{
                   return this.serializeObj(obj);
                }).join('|');
				/*that.errorQueue.forEach( function (){

				});*/
			} else {
    			// 不合并上报
    			console.log('不合并上报');
				if ( queue.length ) {
					let obj = queue[0];
					parames = this.serializeObj(obj);
				}
			}
			this.config.url += '?' + parames;
			let oImg = new Image();
            oImg.onload = () => {
                queue = [];
                if(cb){
                    cb.call(this);
                }
            };
            oImg.src = this.config.url;
		};

		if( isNowReport ){
			// 延迟上报
			this.mergeTimeout = setTimeout( fn, this.config.delay );
		} else {
			// 现在上报
			fn();
		}
    }
    // push错误到pool
    carryError ( error ) {
    	//let that = this;
    	if( !error ) {
    		console.wran('carryError方法内 error 参数为空');
    		return;
    	}
    	// 拿到onerror的参数 放数组中
    	this.errorQueue.push( error );
    }

    // 手动上报 处理方法:全部立即上报 需要延迟吗?
    handleMsg ( msg, type, level ){
    	//let that = this;
    	if( !msg ) {
    		console.wran( type + '方法内 msg 参数为空');
    		return;
    	}
    	let errorMsg = utils.typeDecide(msg,'String') ? {msg:msg} : msg;
        errorMsg.level = level;
    	this.carryError(errorMsg);
    	this.send();
        return errorMsg;
    }
}

export default Report;