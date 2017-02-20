/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
import Peep from "./peep";
import utils from "./utils";

let hasLocal = !!window.localStorage;
let storage = {
	init: function ( key, errorLSSign ){
		this.data = hasLocal ? {} : utils.getCookie( key );
		//this.data = eval("({'targetUrlajscolNumnullrowNumnull':{'value':{'targetUrl':'ajs'},'exp':5},'error2':{'value':{'targetUrl':'ajs'},'exp':5})")
		/*this.data = {
			'error1' : {
				'value': {
						'targetUrl':'ajs',
						'row':'rr',
						'line':'ll',
						'ua':'usus'
					},
				'exp':14876044208965,
				'days' :5
			},
			'error2' : {
				'value': {
						'targetUrl':'bbb',
						'row':'frgthy',
						'line':'rtyty',
						'ua':'uaua'
					},
				'exp':1487777708143,
				'days' :1
			},
			'error3' : {
				'value': {
						'targetUrl':'bbb',
						'row':'frgthy',
						'line':'rtyty',
						'ua':'uaua'
					},
				'exp':34567,
				'days' :-1
			}
		};*/
		/*for(let name in this.data){
			let exp = '';
			if(this.data.hasOwnProperty(name)){
				exp = this.data[name].exp;
			}
			if((+new Date() + 86400*this.data[name].days*1000) >= exp){
				delete this.data[name];
				console.log('shanle');
			}
		}*/
		this.setItem( errorLSSign, this.data, 888 );
	},

	getParam: function( key, type ){
		return utils.parse(localStorage.getItem( key ))[type];
	},

	setItem : function(){
		return hasLocal ? function( key, errorObj, validTime ){
			console.log('ls');
			console.log( key, errorObj, validTime);
			let expiresTime = +new Date() + 1000*60*60*24*validTime;
			let errorKey = '\\targetUrl_' + errorObj.targetUrl + '_colNum_' + (errorObj.colNum || null) + '_rowNum_' + (errorObj.rowNum || null) + '\\';
			localStorage.setItem( key, utils.stringify({
				[errorKey] : {
					'value' : errorObj,
					'exp' : expiresTime,
					'days' : validTime
				}
			}));
			return errorObj;
		} : function( key, errorObj, validTime ){
			console.log('cookie');
			let errorKey = '\\targetUrl_' + errorObj.targetUrl + '_colNum_' + (errorObj.colNum || null) + '_rowNum_' + (errorObj.rowNum || null) + '\\';
			// value 就是传入的一个error对象
			/*
				let json = {
					targetUrl : 'a.js',
					colNum : 3,
					rowNum : 5
				}
				'error3' : {
					'value': {
							'targetUrl':'bbb',
							'row':'frgthy',
							'line':'rtyty',
							'ua':'uaua'
						},
					'exp':34567,
					'days' :-1
				}
			*/
			this.data[errorKey] = {
				'value' : {
					'targetUrl':'bbb',
					'row':'frgthy',
					'line':'rtyty',
					'ua':'uaua'
				},
				'exp' : +new Date() + 1000*60*60*24*validTime,
				'days' : validTime
			};
			//let res = '{{' + errorKey + ':{"value":' + utils.stringify(errorObj) + ',"exp":' + (+new Date() + 1000*60*60*24*validTime) + ',"days":' + validTime +'}}';
			utils.addCookie( key, utils.stringify(this.data), 888 );
		};
	}(),

	getItem:function(){
		return hasLocal ? function( key ){
			console.log('ls');
			return localStorage.hasOwnProperty(key) ? storage.getParam(key,'value') : '';
		} : function( key ){
			console.log('cookie');
			// 取什么数据？是否需要处理？
			return utils.getCookie(key);
		};
	}(),

	clear:function(){
		return hasLocal ? function( key ){
			console.log('ls');
			return key ? localStorage.removeItem(key) : localStorage.clear();
		} : function( key ){
			console.log('cookie');
			return key ? utils.clearCookie(key) : document.cookie.split('; ').forEach(utils.clearCookie);
		};
	}()
	
};

class Localstroage extends Peep {
	constructor(options){
		super(options);
		this.init( this.config.errorLSSign );
	}

	init ( key ){
		return storage.init( key, this.config.errorLSSign );
	}

	//得到元素值 获取元素值 若不存在则返回''
	getItem ( key ) {
		return storage.getItem( key );
	}
	// 设置一条localstorage或cookie
	setItem( errorObj, days ){
		storage.setItem( this.config.errorLSSign, errorObj, days );
	}

	//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie
	clear(key){
		storage.clear( key );
	}
}

export  default Localstroage;