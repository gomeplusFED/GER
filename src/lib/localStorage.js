/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */

import Peep from "./peep";
import utils from "./utils";

class LocalStorageClass extends Peep {
	constructor( options ) {
		super( options );
		/*this.options = {
			expires : 60*24*3600,
			domain : this.config.errorLSSign
		};*/

		// 判断浏览器是否支持localstorage
		this.hasLocal = !!window.LocalStorage;
		
	}

	//得到元素值 获取元素值 若不存在则返回''
	getItem( key ){
		return this.hasLocal ? function( key ){
			return localStorage.hasOwnProperty(key) ? this.getParam(key,'value') : '';
		}.call( this, key ) : function( key ){
			return document.cookie.indexOf(key) !== -1 ? document.cookie.split('; ').forEach(function ( v ){
						return v.split('=')[1];
					}).call( this, key ) : '';
		};
	}

	// 
	getParam( key, type ){
		return utils.parse(localStorage.getItem( key ))[type];
	}
	// 设置一条localstorage或cookie
	setItem( key, value ){
		let expiresTime = +new Date() + 1000*60*60*24*this.config.validTime;
		return this.hasLocal ? function(key, value ){
			localStorage.setItem( key, utils.stringify({
				value:value,
				expires: expiresTime
			}));
			return value;
		}.call(this, key, value ) : function(key, value ){
			//let i = this.findItem(key);
			document.cookie = key + '=' + value + '; expires=' + expiresTime.toGMTString();
		}.call(this, key, value );
	}


	//清除cookie 参数一个或多一
	clear(){
		for(let i =0 ; i < arguments.length; i ++){
			let date = new Date();
			date.setTime( date.getTime() - 100 );
			document.cookie = arguments[i] + "=a; expires=" + date.toGMTString();
		}
	}
}
export default LocalStorageClass;