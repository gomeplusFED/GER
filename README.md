#ger-report   -- 前端异常捕获与上报


## Author
[xiaojue](https://github.com/xiaojue) [sucon0302](https://github.com/sucon0302) [zdongh2016](https://github.com/zdongh2016)

## Install

```shell
$ npm install ger-report
```
```shell
$ bower install https://github.com/gomeplusFED/GER.git
```
```shell
$ lego install ger-report --save
```

## Getting Started
> ger-report 必须在所有类库之前加载并初始化。


##### 初始化
```javascript
GER_REPORT.init({
  	url: 'xxxxxxxx'                       	//错误上报接口地址
});
```
##### 配置说明
```javascript
GER_REPORT.init({
  	mergeReport: true,                    	// mergeReport 是否合并上报， false 关闭， true 启动（默认）
  	delay: 1000,                          	// 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
  	url: "xxxxxxxx",         				// 指定错误上报地址
  	except: [/Script error/i],            	// 忽略某个错误
  	random: 1,                            	// 抽样上报，1~0 之间数值，1为100%上报（默认 1）
  	repeat: 5,                            	// 重复上报次数(对于同一个错误超过多少次不上报)
                                        	// 避免出现单个用户同一错误上报过多的情况
  	onReported: function(){}     			// 当上报的时候回调
});
```

##### 接口接收参数字段说明
```javascript
	colNum:  		//错误列数
	rowNum:  		//错误行数
	msg: 			//错误信息
	target_url  	//错误文件地址
	user_agent 	 	//useragent
	server_ip		//服务器ip
	server_port 	//服务器端口
	current_url  	//错误页面url
	timestamp    	//错误发生时间戳
	project_type 	//错误发生终端 （手机/pc）
	referer_url  	//引用
	ext             // 扩展属性 Object object 上传一些非常规参数
```
GER_REPORT 是重写了 window.onerror 进行上报的，无需编写任何捕获错误的代码
<br/>
#####  手动上报
```javascript
GER_REPORT.report("error msg");

GER_REPORT.report({
  	msg: "xx load error",                 // 错误信息
  	target_url: "xxx.js",                 // 错误的来源js
  	rowNo: 100,                           // 错误的行数
  	colNo: 100,                           // 错误的列数
});

try{
    // something throw error ...
}catch(error){
    GER_REPORT.report(e);
}
```
<br/>
#####  延迟上报
```javascript
GER_REPORT.delayReport("error msg");

GER_REPORT.delayReport({
  	msg: "xx load error",                // 错误信息
  	target_url: "xxx.js",                // 错误的来源js
  	rowNo: 100,                          // 错误的行数
 	colNo: 100,                          // 错误的列数
});

GER_REPORT.report();

```
当 mergeReport = false 时候的， 调用 report ，根据缓冲池中的数据一条条上报;<br/>
当 mergeReport = true 时候的， 会延迟 delay 毫秒，再合并上报
<br/>

### 高级用法

由于 GER_REPORT 只是重写了onerror 方法而已，而且浏览器的跨域问题不能获得外链 javascript 的错误，所以使用tryPeep  进行包裹。
#### 包裹jquery
```javascript
GER_REPORT.tryPeep().peepJquery();
```
包裹 jquery 的 event.add , event.remove , event.ajax 这几个异步方法。
<br/>
<br/>
#### 包裹 define , require
```javascript
GER_REPORT.tryPeep().peepModules();
```
包裹 模块化框架 的 define , require 方法
<br/>
<br/>
#### 包裹  js 默认的方法
```javascript
GER_REPORT.tryPeep().peepSystem();
```
包裹 js 的 setTimeout , setInterval 方法
<br/>
<br/>
#### 包裹 自定义的方法
```javascript
var customFn = function (){};
customFn  = GER_REPORT.tryPeep().peepCustom(customFn );



