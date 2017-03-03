function test(callback){
    callback.call(this);
}
aaa;
var error_report = new window.GER({
    url:'xxxxx',
    failTime : 3,
    tryPeep: true,
    peepSystem: true,
    repeat:10000,
    peepConsole: true,
    validTime : 3,
    peepCustom: [test]
});

/*test(function(){
    throw new Error('test error');
});*/

error_report.info('111111111');

//error_report.on();
error_report.on('error',function(){
    console.log(234546576879)
});

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

console.log(1)*/

console.log(1);

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
//error_report.setItem({'msg':'te12222211st',level:1,rowNum:1},1, 2);
