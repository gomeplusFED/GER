/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
import Peep from "./peep";
import utils from "./utils";

function clearCookie( value ){
	addCookie( value, '', -1 );
}

function addCookie( name, value, days ){
	var times = new Date();
	times.setDate( times.getDate() + days );
	document.cookie = name + "="+ value +"; expires=" + times.toGMTString();
}

function getCookie( key ){
	/*var flag = false;
	document.cookie.split('; ').forEach(function ( v ){
		var item = v.split('=');
		if( item[0] == key ){
			console.log('找到了------------' + item[1]);
			return item[1];
		}
		//key == v.split('=')[1] ? return v.split('=')[1] : ????;
	});
	console.log('再去判断');
	return flag;*/
	var cookieList = document.cookie.split('; ');
	for(var i = 0 ; i < cookieList.length; i++){
		var item = cookieList[i].split('=');
		if( item[0] == key ){
			return item[1];
		}
	}
	return '';
}

var stor = {
	hasLocal : !!!window.localStorage,
	setItem:function(){
		console.log(stor);
		return this.hasLocal ? function( key, value, validTime ){
			let expiresTime = +new Date() + 1000*60*60*24*validTime;
			console.log('lslslsllslslsls');
			localStorage.setItem( key, utils.stringify({
				value : value,
				expires : expiresTime
			}));
			return value;
		} : function( key, value, validTime ){
			console.log('addCookieaddCookieaddCookieaddCookie');
			addCookie( key, value, validTime );
		};
	}(),
	getItem:function(){
		return this.hasLocal ? function( key ){
			return localStorage.hasOwnProperty(key) ? this.getParam(key,'value') : '';
		} : function( key ){
			return getCookie( key );
		};
	}(),
	clear:function(){
		return this.hasLocal ? function( key ){
			return key ? localStorage.removeItem(key) : localStorage.clear();
		} : function( key ){
			return key ? clearCookie(key) : document.cookie.split('; ').forEach(clearCookie);
		};
	}()
};
console.log(stor);
class LocalStorageClass extends Peep {
	constructor( options ) {
		super( options );
		//this.hasLocal = !!window.localStorage;
		this.errorSign = this.config.errorLSSign;
	}

	//得到元素值 获取元素值 若不存在则返回''
	/*getItem( key ) {
		//storages.getItem( key );
	}
	// 
	getParam( key, type ){
		return utils.parse(localStorage.getItem( key ))[type];
	}
	// 设置一条localstorage或cookie
	//setItem : storages.setItem
	setItem( key, value, days ){
		//console.log(storages)
		//storages.setItem( key, value, days );
	}

	//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie
	//clear : storages.clear
	clear(){
		//storages.clear( key );
	}*/
}
export default LocalStorageClass;