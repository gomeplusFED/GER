/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */

import Peep from "./peep";
import utils from "./utils";

function clearCookie( value ){
	addCookie( value, 'a', -1 );
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
	var arr = document.cookie.split('; ');
	for(var i = 0 ; i < arr.length; i++){
		var arr1 = arr[i].split('=');
		if( arr1[0] == key ){
			return arr1[1];
		}
	}
	return '';
}
//getCookie( 'a' );

/*var storage = {
	 hasLocal : !!window.localStorage,
	 setItem:function(){
		let expiresTime = +new Date() + 1000*60*60*24*this.config.validTime;
		return this.hasLocal ? function( key, value ){
			localStorage.setItem( key, utils.stringify({
				value : value,
				expires : expiresTime
			}));
			return value;
		} : function( key, value ){
			document.cookie = key + '=' + value + '; expires=' + expiresTime.toGMTString();
		};
	}(),
	getItem:function(){
		return this.hasLocal ? function( key ){
			return localStorage.hasOwnProperty(key) ? this.getParam(key,'value') : '';
		} : function( key ){
			return document.cookie.indexOf(key) !== -1 ? document.cookie.split('; ').forEach(( v ) => {
						return v.split('=')[1];
			}) : '';
		};
	}(),
	clear:function(){
		
		return this.hasLocal ? function( key ){
			// ls
			return key ? localStorage.removeItem(key) : localStorage.clear();
		} : function( key ){
			// cookie
			return key ? clearCookie(key) : document.cookie.split('; ').forEach(clearCookie);
		};
	}()
};*/

class LocalStorageClass extends Peep {
	constructor( options ) {
		super( options );
		this.hasLocal = !!window.localStorage;
		this.errorSign = this.config.errorLSSign;
	}

	//得到元素值 获取元素值 若不存在则返回''
	//getItem : storage.getItem
	getItem(){
		utils.fnLazyLoad( this.hasLocal, function( key ){
			return localStorage.hasOwnProperty(key) ? this.getParam(key,'value') : '';
		}, function( key ){
			getCookie( key );
		});
	}
	// 
	getParam( key, type ){
		return utils.parse(localStorage.getItem( key ))[type];
	}
	// 设置一条localstorage或cookie
	//setItem : storage.setItem
	setItem(){
		let expiresTime = +new Date() + 1000*60*60*24*this.config.validTime;
		utils.fnLazyLoad( this.hasLocal, function( key, value ){
			localStorage.setItem( key, utils.stringify({
				value : value,
				expires : expiresTime
			}));
			return value;
		}, function( key, value ){
			addCookie( key, value, this.config.validTime );
		});
	}

	//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie
	clear(){
		utils.fnLazyLoad( this.hasLocal, function ( key ){
			return key ? localStorage.removeItem( key ) : localStorage.clear();
		},function ( key ){
			return key ? clearCookie( key ) : document.cookie.split('; ').forEach( clearCookie );
		});
	}
}
export default LocalStorageClass;