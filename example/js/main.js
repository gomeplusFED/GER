'use strict';
function test1(callback){
	callback.call(this);
}
function test2(callback){
	callback.call(this);
}
function test3(callback){
	callback.call(this);
}
function test1(callback){
	callback.call(this);
}
test3(function(){
	alert(333333);
})
test1(function(){
	alert(11111111);
})
test2(function(){
	alert(222222222);
})
var error_report = new Ger({
	url:'xxxxx',
	failTime : 3,
	tryPeep: true,
	peepSystem: true,
	repeat:10000,
	peepConsole: true,
	validTime : 3,
	peepCustom: [test1,test2,test3]
});

//error_report.info('111111111');

//error_report.on();
/*error_report.on('error',function(){
	console.log(234546576879)
});*/

//localStorage.setItem('a', '123245678');
/*setTimeout(function(){
	console.log(1111)
},1000);
*//*
console.log(1);

console.log(1)

console.log(1)

console.log(1)


console.log(1)

console.log(1)

console.log(1)


console.log(1)

console.log(1)

console.log(1)


console.log(1)

console.log(1)

console.log(1)

console.log(1);*/
//localStorage.setItem('a', '123245678');
/*setTimeout(function(){
	console.log(1111)
},1000);*/
// error_report.setItem('key', 'ertyudfgfhghfgdfsdasa', 8)
// console.log(error_report.getItem('key'));
// error_report.clear();
/*error_report.setItem('key', 'ertyudfgfhghfgdfsdasa', 8)
console.log(error_report.getItem('key'));
error_report.clear();*/
