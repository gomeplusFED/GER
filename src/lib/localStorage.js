/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
import Peep from "./peep";
import utils from "./utils";

let hasLocal = !!window.localStorage;
let storage = {
	getParam: function( key, type ){
		return utils.parse(localStorage.getItem( key ))[type];
	},
	setItem : function(){
		return hasLocal ? function( key, value, validTime ){
			let expiresTime = +new Date() + 1000*60*60*24*validTime;
			localStorage.setItem( key, utils.stringify({
				value : value,
				expires : expiresTime
			}));
			return value;
		} : function( key, value, validTime ){
			utils.addCookie( key, value, validTime );
		};
	}(),
	getItem:function(){
		return hasLocal ? function( key ){
			return localStorage.hasOwnProperty(key) ? storage.getParam(key,'value') : '';
		} : function( key ){
			return utils.getCookie(key);
		};
	}(),

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
	}

	//得到元素值 获取元素值 若不存在则返回''
	getItem ( key ) {
		return storage.getItem( key );
	}
	// 设置一条localstorage或cookie
	setItem( key, value, days ){
		storage.setItem( key, value, days );
	}

	//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie
	clear(key){
		storage.clear( key );
	}
}

export  default Localstroage;