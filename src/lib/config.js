/**
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */

import utils from './utils';
const config = {
	isHybrid:false,
	hybridInfo:{
		host:'template id', //必选，标明是什么模板
		//其他你想传的参数，最后都会merge到SystemParams上
	},
  proxyAll: false,
  mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
  delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
  dataKey: 'err_msg', //上报数据的属性名，用于服务器获取数据
  url: '', // 指定错误上报地址
  getPath: '/read.gif', // get请求路径
  postPath: '/post/jserr',  // post请求路径
  except: [ /^Script error\.?/, /^Javascript error: Script error\.? on line 0/ ], // 忽略某个错误
  random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
  repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
  errorLSSign: 'mx-error', // error错误数自增 0
  maxErrorCookieNo: 20, // error错误数自增 最大的错
  validTime: 7
};

let Config = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        const assignConfig = utils.assignObject( config, options );
        super(assignConfig);
        this.config = assignConfig;
    }
    get( name ) {
        return this.config[ name ];
    }
    set( name, value ) {
        this.config[ name ] = value;
        return this.config[ name ];
    }

};

export default Config;
