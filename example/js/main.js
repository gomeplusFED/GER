'use strict';
var error_report = new Ger({
	url:'http://127.0.0.1/badjs-report/repeat.php'
});
/*
error_report.rewriteError();
error_report.testsdsdsds();*/
//error_report.info('sdsdsds');
//error_report.set('url','xxxx');
//console.log(error_report.get('url'));
error_report.on('message',()=>{
	console.log(11111)
});
error_report.off('message');
error_report.trigger('message');