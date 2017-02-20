/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
import Peep from "./peep";
import utils from "./utils";

let hasLocal = !!window.localStorage;
let storage = {
	//设置cookie内json的key名
	setKey:function(errorObj){
		let keyArr =  [];
		errorObj.msg && keyArr.push(errorObj.msg);
		errorObj.colNum && keyArr.push(errorObj.colNum);
		errorObj.rowNum && keyArr.push(errorObj.rowNum);
		return keyArr.join('@');
	},
	//检查是否有效
	checkData : function( data ){
		let oData = data === '' ? {} : utils.parse( data );
		let date = +new Date();
		for(  let key in oData ){
			if( utils.parse(oData[key]).expiresTime <= date ){
				delete oData[key];
			}
		}
		return oData;
	},
	//设置失效时间
	setEpires: function( validTime ){
		return  +new Date() + (1000*60*60*24*validTime);
	},
	//获取cookie/localStorage内容体
	setInfo: function(key, errorObj, validTime, number){
		
		let loac = storage.getItem( key );
		if( errorObj !== undefined ){
			let keys = Object.keys( loac );
			if( keys.length >  number ){
				delete loac[keys[0]];
			}
			let expiresTime = storage.setEpires(validTime);
			loac[storage.setKey(errorObj)] = utils.stringify({
				value:errorObj,
				expiresTime: expiresTime
			});
			
		}
		return utils.stringify(loac);
	},
	//设置cookie/localStorage
	setItem : function(){
		return hasLocal ? function( key, errorObj, validTime, number ){
			localStorage.setItem( key, storage.setInfo(key, errorObj, validTime, number ));
		} : function( key, errorObj, validTime, number ){
			utils.addCookie( key,  storage.setInfo(key, errorObj, validTime, number ) );
		};
	}(),
	//获取cookie/localStorage
	getItem: function(){
		return hasLocal ? function( key ){
			return storage.checkData( localStorage.getItem( key ) || '' );
		} : function( key ){
			return storage.checkData( utils.getCookie(key));
		};
	}(),
	//清除cookie/localStorage
	clear:function(){
		return hasLocal ? function( key ){
			return key ? localStorage.removeItem(key) : localStorage.clear();
		} : function( key ){
			return key ? utils.clearCookie(key) : document.cookie.split('; ').forEach(utils.clearCookie);
		};
	}()
	
};




class Localstroage extends Peep {
	constructor(options){
		super(options);
		this.init();
	}

	//得到元素值 获取元素值 若不存在则返回''
	getItem ( key ) {
		return storage.getItem( key );
	}
	// 设置一条localstorage或cookie
	setItem( errorObj ){
		let _config = this.config;
		storage.setItem( this.config.errorLSSign, errorObj, _config.validTime, _config.maxErrorCookieNo );
	}

	//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie
	clear(key){
		storage.clear( key );
	}
	init (){
		this.getItem(  );
		this.setItem(   );
	}

}

export  default Localstroage;