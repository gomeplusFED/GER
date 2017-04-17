# GER

gomeplus error report简称GER，它非常简单和轻巧。如果你需要一个JavaScript前端错误监控sdk，GER是一个非常好的选择，你可以结合[ElasticSearch](https://www.elastic.com/)和[GER-server](https://github.com/gomeplusFED/GER-server)来打造你自己的前端监控系统。

## 入门

### 安装和构建

```bash
$ git clone https://github.com/gomeplusFED/GER.git
$ cd GER && npm install -d && npm run build
$ ls dist
$ ger.js  ger.min.js
```

构建出压缩和未压缩的2个GER版本，你可以在你的网站任何位置插入这段js，例如：

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

当然你也可以使用js引入GER,比如使用jquery的`$.getScript`方法，但是需要注意，因为GER是使用ES6语法编写的，所以在IE8以下需要使用babel-polyfill。


### 初始化

在下载并且成功构建完成GER后，你需要对他进行初始化配置，初始化方法如下：

```js
var errorReport = new GER（ options );
```
#### 具体配置信息

| 字段 | 类型 | 含义 | 默认值 |
| ------| ------ | ------ | ------ |
| url | String | 指定错误上报地址 | "" |
| delay | Number | mergeReport 为 true 时才可用，延迟多少毫秒 | 1000ms |
| mergeReport | Boolean | 是否合并上报 | true |
| except | Array | 忽略某个错误 |  [/^Script error\.?/,/^Javascript error: Script error\.? on line 0/] |
| random | Number | 抽样上报，1~0 之间数值，1为100%上报 | 1 |
| repeat | Number | 对于同一个错误超过多少次不上报 | 5 |
| errorLSSign | String | error本地存储KEY | mx-error |
| maxErrorCookieNo | Number | error错误数自增 | 20 |
| validTime | Number | error的cookie/localStorage 有效时长  | 7day |
| proxyJquery | Boolean | 是否代理jquery或zepto的 event.add , event.remove , event.ajax | false |
| proxyModules | Boolean | 是否代理页面中的define , require | false |
| proxyTimer | Boolean | 是否代理页面中的setTimeout , setInterval | false |
| proxyConsole | Boolean | 是否代理页面中的console下所有方法，代理后会对服务进行对应的上报 | false |
| proxyAll | Boolean | 设置所有代理选项值 | false |

当初始化成功之后，如果你开启了`proxy*`，那么它会再劫持一系列常见类库的方法，或者define等模块通用方法，用法参加配置说明，GER重写了 window.onerror 进行上报的，无需编写任何捕获错误的代码，也不会影响页面已有的onerror事件。

当配置完成后，所配置的`{url:"http://localhost:8080/GER/report"}`接口地址会收到以下参数格式的GET请求。

### 上报参数

| 字段 | 类型 | 含义 |
| ------| ------ | ------ |
| msg | String | 错误信息 |
| level | level | 错误级别 |
| colNum | Number | 错误列 |
| rowNum | Number | 错误行 |
| targetUrl | String | 错误js文件 |
| title | String | 错误页面标题 |
| referer | String | 页面来源 |
| currentUrl | String | 错误发生页面URL |
| host | String | 错误发生页面host |
| userAgent | String | 浏览器信息 |
| timestamp | Date | 发生错误时间戳 |
| projectType | String | 客户端类型PC/Mobile |
| flashVer | Number | flash版本 |
| screenSize | String | 分辨率 |
| ext | Object | 扩展信息可自定义，手工上报时可用 |


### 手动&延迟上报

如果你需要跟踪排查一些无法用onerror排查到或者代理到的错误，可能会需要手工`try catch`后再上报错误，使用方法如下：

```js
var errorReport = new GER();

try{
  /*...some code...*/
}catch(error){
  var ext = {}; //额外信息
  errorReport.error(error); //更多用法参加error方法
  //errorReport.log/debug/info/warn/error 都可手动上报
  errorReport.catchError(error); //只收集不上报
  errorReport.send(); //开始上报队列
}
```

当 `mergeReport` 为 `false` 时候的， 调用 report ，根据缓冲池中的数据一条条上报,当 `mergeReport` 为 `true` 时候的， 会延迟 delay 毫秒，再合并上报。

### 属性

| 字段 | 类型 | 含义 |
| ------| ------ | ------ |
| config | Object | 配置项 |
| handlers | Object | 自定义事件存储 |
| errorQueue | Array | 错误信息队列 |
| repeatList | Array | 重复错误队列 |

### 方法

#### set, get

```js
myGER.get('mergeReport'); //options config.mergeReport
myGER.set('mergeReport',true);
```

#### log, debug, info, warn, error 

```js
myGER.log("msg" || {}); //手工上报方法，根据log，debug，info，wran，error 对应上报时的 level: 0,1,2,3,4
```

#### catchError，send

```js
myGER.catchError(errorObj); //不上报，只收集
myGER.send(callback); //上报
```

#### on,off,trigger

```js
var myGER = new GER();
myGER.on('someCustomEventName',(arg1,arg2)=>{
    
});
myGER.trigger('someCustomEventName',[arg1,arg2]);
```

#### setItem,getItem,clear

设置cookie/localStorage  低版本浏览器设置cookie  高级浏览器设置localStorage

```js
myGER.setItem({
    msgName : {
        value: errorMsg.msg,
        expiresTime: expiresTime
    }
});                                       //push一条错误信息到cookie/localStorage 存储的key为初始化时 errorLSSign 的值 条数限制为初始化时传入 maxErrorCookieNo 的数量
errorReport.getItem('errorLSSign');       // 返回当前域名下的错误
errorReport.clear();                      // 清除 cookie/loacalStorage 所有错误信息
```

### 事件

#### beforeReport

上报之前拦截，如果返回值是false，则阻止上报动作。

#### afterReport

上报成功之后触发。

#### tryError

try catche后上报前触发，arg1=errorObj，可以对error再次自定义处理。

#### error

window.onerror时触发，如果返回false,则阻止onerror事件，可以再次监控onerror事件。

### 自定义函数劫持

#### proxyCustomFn

```js
let fn1 = () => {
  //do something....
}
let fn2 = myGER.proxyCustomFn(fn1); //return a new function
fn2();
```
#### proxyCustomObj

```js
let funObj = {
  fn1: () => {
    //do something....
  },
  fn2: () => {
    //do something....
  }
}
let newFuncObj = myGER.proxyCustomObj(fn1); //return a new object
newFuncObj.fn1();
```
