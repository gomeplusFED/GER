##### init
```javascript
var errorReport = new GER( options );
options is a set of key/value pairs configured with GER requests;
{
    url: "http://www.gome.com.cn/report",   // Specify the error to report the address
    mergeReport: true,                      // Whether to merge and report, false shut down， true start（default）
    delay: 1000,                            // if mergeReport is true, how many milliseconds was delayed, and reported in the merge buffer（default）
    random: 1,                              // sampling reported, 1 to 0 between the value of 1 to 100% reported（default 1）
    repeat: 5,                              // for the same error more than how many times not reported
    errorLSSign:'mx-error'                  // errors increases 0
    maxErrorCookieNo:50,                    // max errors
    validTime: 7                            // cookie/localStorage duration  (unit : day)
}

errorReport.set('delay',1000);              // set the parameters for the GER config
errorReport.get('delay');                   // get GER parameters form config
```

##### receive params list
```javascript

    useragent                               // useragent
    currentUrl                              // error page url
    timestamp                               // error occurred timestamp
    projectType                             // Pc/Mobile
    flashVer                                // flash version
    title                                   // error page title
    screenSize                              // size of screen
    referer                                 // prepage url
    colNum                                  // error cols
    rowNum                                  // error rows
    msg                                     // error message
    targetUrl                               // error file address
    ext                                     // extended attribute Object object, upload some unconventional
```
the GER rewrites the window.onerror for escalation without writing any code that captures the error

#####  manual report
```javascript
var errorReport = new GER();
errorReport.error("error msg");

errorReport.error({
    msg: "xx load error",                   // error message
    targetUrl: "a.js",                      // js wrong file source
    rowNo: 100,                             // error rows
    colNo: 100                              // error cols
});

//errorReport.log/debug/info/warn/error;   also can be reported manually

try{
    // something throw error ...
}catch(error){
    errorReport.error(error);
}
```

#####  error report
```javascript
<!-- errorReport.delayReport("error msg");

errorReport.delayReport({
    msg: "xx load error",                   // error message
    targetUrl: "a.js",                      // js wrong source
    rowNo: 100,                             // error rows
    colNo: 100                              // error cols
}); -->

errorReport.report();

```
if mergeReport = false, use report according to the data in the buffer pool a report<br/>
if mergeReport = true, will delay milliseconds, and then merge reported

### before and after the report

```javascript
var myGER = new GER();
beforeReport
myGER.on('beforeReport',function(err){
    return false;
});
afterReport
myGER.on('afterReport',function(err){
    
});
myGER.on('error',function(err){
    return false;
});
```


#####  set cookie/localStorage low version of the browser set cookie, advanced browser set localStorage
```javascript
errorReport.setItem( object );              // push the object to cookie/localStorage, the value of the value of the errorLSSign when the stored key is initialized is limited to the number of incoming maxErrorCookieNo at initialization
eg:{
    msgName : {
        value: errorMsg.msg,
        expiresTime: expiresTime
    }
}
errorReport.getItem( 'key');                // return the error item
errorReport.clear();                        // clear all cookie or localStorage message

```


### advanced usage

#### proxy jquery

proxy jquery event.add, event.remove, event.ajax these several asynchronous methods.
```javascript
new GER({
    proxyJquery:true
});
```


#### proxy  define , require

proxy modular framework of the define, require method
```javascript
new GER({
    proxyModules:true
});
```

#### proxy js default method

proxy js setTimeout, setInterval method
```javascript
new GER({
   proxyTimer:true 
});
```

#### proxy custom method

```javascript
var customFn = function (){};
customFn  = new GER({
    proxyCustom:[ customFn1, customFn2, customFn3 ]
});
```

### proxy console
```javascript
new GER({
    proxyConsole: true
});
```
