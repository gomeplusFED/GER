
/*var error_report = new GER({
    url:'https://www.gomeplus.com/ajax/log/index?err_msg=',
    // url:'https://www-pre.gomeplus.com/ajax/log/index?err_msg=',
    repeat:5,
    delay: 1000,
    validTime : 3
});*/
// bbbbb;
//https://www-pre.gomeplus.com/ajax/log/index?err_msg=msg=evalxxxxxx

//log, debug, info, warn, error 

// error_report.log('attachEvent is not defined ---------- report from log');
// error_report.debug('new new this item report from debug');
// error_report.info('new new this item report from info');
// error_report.warn('new new this item report from warn');
// error_report.error('new new this item report from error');

var error_report = new GER({
    url:'https://www.gomeplus.com/ajax/log/index?err_msg=',
    repeat:5,
    delay: 1000,
    validTime : 3,
    proxyAll: true
});

$('a').on('click', function(){
	/*setTimeout(function (){
        console.log('aaaaaa');
    }, 1000);*/
    // alert(1);
    console.log(1);
});




