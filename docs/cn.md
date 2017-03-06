##### 初始化
```javascript
var errorReport = new GER( options );
options是一组配置 GER 请求的 键/值对;
{
    url: "http://www.gome.com.cn/report",   // 指定错误上报地址
    mergeReport: true,                      // mergeReport 是否合并上报， false 关闭， true 启动（默认）
    delay: 1000,                            // 当 mergeReport 为 true 时才可用，延迟多少毫秒，合并缓冲区中的上报（默认）
    random: 1,                              // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
    repeat: 5,                              // 对于同一个错误超过多少次不上报
    errorLSSign:'mx-error'                  // error错误数自增 0
    maxErrorCookieNo:50,                    // error错误数自增 最大的错
    validTime: 7                            // cookie/localStorage 有效时长 （单位：天）
}

errorReport.set('delay',1000);              // 为 GER 实例设置参数
errorReport.get('delay');                   // 获取 GER 实例参数
```

##### 接口接收参数字段说明
```javascript

    userAgent                               // userAgent
    currentUrl                              // 错误页面url
    timestamp                               // 错误发生时间戳
    projectType                             // 客户端类型 Pc/Mobile
    flashVer                                // flash 版本号
    title                                   // 页面名称
    screenSize                              // 屏幕尺寸
    referer                                 // 上一个页面的url
    colNum                                  // 错误列数
    rowNum                                  // 错误行数
    msg                                     // 错误信息
    targetUrl                               // 错误文件地址
    ext                                     // 扩展属性 Object object 上传一些非常规参数


```
GER重写了 window.onerror 进行上报的，无需编写任何捕获错误的代码

#####  手动上报
```javascript
var errorReport = new GER();
errorReport.error("error msg");

errorReport.error({
    msg: "xx load error",                   // 错误信息
    targetUrl: "a.js",                      // 错误的来源js
    rowNo: 100,                             // 错误的行数
    colNo: 100                              // 错误的列数
});

//errorReport.log/debug/info/warn/error; 都可手动上报

try{
    // something throw error ...
}catch(error){
    errorReport.error(error);
}
```

#####  error上报
```javascript
<!-- errorReport.delayReport("error msg");

errorReport.delayReport({
    msg: "xx load error",                   // 错误信息
    targetUrl: "a.js",                      // 错误的来源js
    rowNo: 100,                             // 错误的行数
    colNo: 100                              // 错误的列数
}); -->

errorReport.report();

```
当 mergeReport = false 时候的， 调用 report ，根据缓冲池中的数据一条条上报;<br/>
当 mergeReport = true 时候的， 会延迟 delay 毫秒，再合并上报

### 上报前后的处理
```javascript
var myGER = new GER();
上报前
myGER.on('beforeReport',function(err){
    return false;
});
上报后
myGER.on('afterReport',function(err){
    
});
myGER.on('error',function(err){
    return false;
});
```

#####  设置cookie/localStorage  低版本浏览器设置cookie  高级浏览器设置localStorage
```javascript
errorReport.setItem( object );              // push一条错误信息到cookie/localStorage 存储的key为初始化时 errorLSSign 的值 条数限制为初始化时传入 maxErrorCookieNo 的数量,
eg:{
    msgName : {
        value: errorMsg.msg,
        expiresTime: expiresTime
    }
}
errorReport.getItem( 'key' );               // 返回当前key对应的一条错误信息
errorReport.clear();                        // 清除 cookie/loacalStorage 所有错误信息

```


### 高级用法

#### 包裹jquery

包裹 jquery 的 event.add , event.remove , event.ajax 这几个异步方法。
```javascript
new GER({
    proxyJquery:true
});
```

#### 包裹 define , require

包裹 模块化框架 的 define , require 方法
```javascript
new GER({
    proxyModules:true
});
```

#### 包裹  js 默认的方法

包裹 js 的 setTimeout , setInterval 方法
```javascript
new GER({
   proxyTimer:true 
});
```

#### 包裹 自定义的方法
```javascript
var customFn = function (){};
customFn  = new GER({
    proxyCustom:[ customFn1, customFn2, customFn3 ]
});
```

### 包裹console
```javascript
new GER({
    proxyConsole: true
});
```
