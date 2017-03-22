
var error_report = new GER({
    url:'http://127.0.0.1:8888/report/add',
    repeat:5,
    delay: 1000,
    validTime : 3
});

error_report.on('beforeReport',function(){
    console.log(1111111);
})
error_report.on('afterReport',function(){
    //console.log(this.url.indexOf('aa'));
})

setTimeout(function(){
    aaaa
},1000);

/*test(function(){
    throw new Error('test error');
});*/

//error_report.info('111111111');
//dfsfsd
/*
console.log(111);
console.log(22222222);*/

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

console.log(1)*/

//console.log(1);

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
