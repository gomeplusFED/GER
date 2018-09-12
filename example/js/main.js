var error_report = new GER({
  url: 'https://beacon.sinajs.cn/read.gif',
  repeat: 2,
  delay: 2000,
  validTime: 3,
  maxErrorCookieNo: 5
});

error_report.on('beforeReport', function() {
  console.log(1111111);
})

error_report.on('afterReport', function() {
  console.log(this.url.indexOf('aa'));
})

setTimeout(function() {
  aaaa
}, 1000);
/*
test(function() {
  throw new Error('test error');
});
*/

//error_report.info('111111111');
//dfsfsd
/*
console.log(111);
console.log(22222222);*/

//error_report.on();
error_report.on('error',function(msg){
    console.log(msg);
});

//localStorage.setItem('a', '123245678');
/*setTimeout(function(){
    console.log(1111)
},1000);
*/
/*
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
