'use strict';
var error_report = new Ger({
	url:'xxxxx',
	validTime : 3
	//tryPeep: true,
	//peepSystem: true,
	//repeat:10000
});

//error_report.info('111111111');

//error_report.on();
/*error_report.on('error',function(){
	console.log(234546576879)
});*/

//localStorage.setItem('a', '123245678');
/*setTimeout(function(){
	console.log(1111)
},1000);*/
error_report.setItem('key', 'ertyudfgfhghfgdfsdasa', 8)
console.log(error_report.getItem('key'));
error_report.clear();
