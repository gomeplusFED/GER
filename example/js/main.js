'use strict';
var error_report = new Ger({
	url: 'http://127.0.0.1/badjs-report/repeat.php',
	mergeReport: false,
	random : 1
});
/*
try{
	aaa
}catch(e){
	error_report.log('logslogs');
}*/
error_report.info('111111111');

error_report.on();