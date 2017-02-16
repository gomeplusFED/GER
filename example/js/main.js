'use strict';
var error_report = new Ger();

try{
	aaa
}catch(e){
	error_report.log('logslogs');
}
//error_report.info('111111111');

//error_report.on();
error_report.on('afterReport',function(){
	console.log(111111);
});