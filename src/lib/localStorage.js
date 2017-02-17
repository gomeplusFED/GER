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

    // 检查key是否存在 return true/false
	findItem( key ){
		return document.cookie.indexOf(key) === -1;
	}

	//得到元素值 获取元素值 若不存在则返回 null
	getItem( key ){
		if(!this.findItem(key)){
			let array = document.cookie.split(';');           
			for(let j=0;j<array.length;j++){
				let arraySplit = array[j];
				if(arraySplit.indexOf(key) > -1){
					let getValue = array[j].split('=');
					//将 getValue[0] trim删除两端空格
					getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
					if(getValue[0]==key){
						return getValue[1];
					}else{
						return 'null';
					}
				}
			}
		}
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
	
	localStorageHandle(cb){
		let callback = cb || function(){};
		this.localStorage = localStorage !== undefined ? localStorage : this;
		callback.call(this, this.localStorage);
	}
}
export default LocalStorageClass;