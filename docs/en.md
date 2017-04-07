# GER

GER is short for gomeplus error report, it is very simple and lightweight.If you need a JavaScript Front end error monitoring sdk, GER is a very good choice. You can combine [ElasticSearch](https://www.elastic.com/) and [GER-server](https://github.com/gomeplusFED/GER-server) to create your own front-end monitoring system.

## Introduction

### Installation and construction

```bash
$ git clone https://github.com/gomeplusFED/GER.git
$ cd GER && npm install -d && npm run build
$ ls dist
$ ger.js  ger.min.js
```

Build compressed and uncompressed two GER versions, you can insert this in any location on your websitejs, for example：

```html
<!doctype html>
<html>
    <head></head>
    <body>
        <!--[if IE]>
           <script type="text/javascript" src="http://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.js"></script>
        <![endif]-->
        <script src="dist/ger.min.js"></script>
    </body>
</html>
```

Of course you can also use js to introduce GER, such use `$.getScript` method of Jquery, but need attention, because of GER is written using the `ES6`, so the following `IE8` need to use `babel-polyfill`.


### init

After you have downloaded and successfully completed the GER, you will need to initialize the configuration to him：

```js
var errorReport = new GER（ options );
```
#### Specific configuration information

| field | type | meaning | default |
| ------| ------ | ------ | ------ |
| url | String | Error reporting address | "" |
| delay | Number | MergeReport is only available when true, the number of milliseconds delay | 1000ms |
| mergeReport | Boolean | Whether merge report | true |
| delayReport | Boolean | Whether delayed report | false |
| except | Array | Ignore an error |  [/^Script error\.?/, /^Javascript error: Script error\.? on line 0/] |
| random | Number | Sampling report, 1~0 between the values, 1 for the report of 100% | 1 |
| repeat | Number | How many times do not report to the same error | 5 |
| errorLSSign | String | Error localStorage key | mx-error |
| maxErrorCookieNo | Number | Error number increment | 20 |
| validTime | Number | Cookie/localStorage effective length of error  | 7day |
| proxyJquery | Boolean | Whether agent jQuery or zepto event.add, event.remove, event.ajax | false |
| proxyModules | Boolean | Whether the proxy page in the define, require | false |
| proxyTimer | Boolean | Whether the proxy page in the setTimeout, setInterval | false |
| proxyConsole | Boolean | Whether the proxy page in the console under all the methods, the agent will report the corresponding service | false |
| proxyCustom | Array | Optional proxy for some other custom functions | [] |
| proxyAll | Boolean | Set all proxy options | false |

After the initialization of success, if you turn on the `proxy*`, then it will then hijack a series of common class methods, or define modules and general methods, usage in configuration instructions, to rewrite the GER window.onerror report, without writing any capture error code, it will not affect the existing onerror page events.

When the configuration is completed, the configuration of the `{url: "http://localhost:8080/GER/report"}` interface address will receive requests for the following parameters format GET.

### report param

| field | type | meaning |
| ------| ------ | ------ |
| userAgent | String | Browser information |
| currentUrl | String | Error page URL |
| host | String | Error page host |
| timestamp | Date | Error time stamp |
| projectType | String | Client type PC/Mobile |
| flashVer | Number | flash version |
| title | String | Error page title |
| screenSize | String | Resolving power |
| referer | String | Page source |
| colNum | Number | Error column |
| rowNum | Number | Error line |
| msg | String | error message |
| level | level | error level |
| targetUrl | String | Error JS file |
| ext | Object | Extended information can be customized, manual timekeeping available |


### Manual & delay reporting

If you need to track some of the investigation can not be used to troubleshoot onerror or agent to the error, you may need to manually `try catch` and then report the error, the use of the following：

```js
var errorReport = new GER();

try{
  /*...some code...*/
}catch(error){
  var ext = {}; //Additional information
  errorReport.error(error); //More usage in error method
  //errorReport.log/debug/info/warn/error can be reported manually
  errorReport.catchError(error); //Collection is not reported
  errorReport.send(); //Start queue
}
```

When the `mergeReport` is `false`, call report, according to the buffer pool of data in a report, when the `mergeReport` is `true`, the delay of delay milliseconds, and then merged Report.

### attribute

| field | type | meaning |
| ------| ------ | ------ |
| config | Object | Configuration item |
| handlers | Object | Custom event store |
| errorQueue | Array | Error message queue |
| repeatList | Array | Repeat error queue |

### Method

#### set,  get

```js
myGER.get('mergeReport'); //options config.mergeReport
myGER.set('mergeReport', true);
```

#### log,  debug,  info,  warn,  error 

```js
myGER.log("msg" || {}); //Manual reporting method, according to log, debug, info, wran, error corresponds to timekeeping on level: 0, 1, 2, 4, 3
```

#### catchError, send

```js
myGER.catchError(errorObj); //Not reported, only collection
myGER.send(callback); //Report
```

#### on, off, trigger

```js
var myGER = new GER();
myGER.on('someCustomEventName', (arg1, arg2)=>{
    
});
myGER.trigger('someCustomEventName', [arg1, arg2]);
```

#### setItem, getItem, clear

Set cookie/localStorage low browser settings cookie advanced browser settings localStorage

```js
myGER.setItem({
    msgName : {
        value: errorMsg.msg, 
        expiresTime: expiresTime
    }
});                                       //Push an error message to cookie/localStorage. The number of errorLSSign entries stored at key is limited to the number of incoming maxErrorCookieNo when initialized
errorReport.getItem('errorLSSign');       // Error in current domain name
errorReport.clear();                      // Clear all cookie/loacalStorage error messages
```

### Events

#### beforeReport

Prior to the interception, if the return value is false, then stop the report action.

#### afterReport

Trigger after successful reporting.

#### tryError

Try catche after the report before the trigger, arg1=errorObj, you can customize the error again.

#### error

When `window.onerror` is triggered, if returned false, the onerror event is prevented, and the onerror event can be monitored again.
