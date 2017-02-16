/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */

class LocalStorageClass {
	constructor( options ) {
		console.log(options);
		this.options = {
			expires : 60*24*3600
			//domain : this.config.errorLSSign
		};

    	let date = new Date();
		date.setTime(date.getTime() + 60*24*3600);
		this.setItem('expires',date.toGMTString());
	}
    //内部函数 参数说明(key) 检查key是否存在
	findItem( key ){
		let bool = document.cookie.indexOf(key);
		if( bool < 0 ){
			return true;
		}else{
			return false;
		}
	}

	//得到元素值 获取元素值 若不存在则返回 null
	getItem( key ){       
		let i = this.findItem(key);
		if(!i){
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

	//重新设置元素
	setItem(key,value){
		//let i = this.findItem(key);
		document.cookie=key+'='+value;
	}

	//清除cookie 参数一个或多一
	clear(){
		for(let cl =0 ;cl<arguments.length;cl++){
			let date = new Date();
			date.setTime(date.getTime() - 100);
			document.cookie =arguments[cl] +"=a; expires=" + date.toGMTString();
		}
	}
	
	localStorageHandle(cb){
		let callback = cb || function(){};
		this.localStorage = localStorage !== undefined ? localStorage : this;
		callback.call(this, this.localStorage);
	}
}
export default LocalStorageClass;