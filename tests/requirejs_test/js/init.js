
var error_report = new GER({
    url:'https://www.gomeplus.com/ajax/log/index?err_msg=',
    repeat:5,
    delay: 1000,
    validTime : 3,
    proxyModules: true
});

require(['mod1'], function(mod1) {
	console.log(mod1.color);
});