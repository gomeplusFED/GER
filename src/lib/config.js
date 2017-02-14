
export default  class () {

	constructor ( options ){
		this.config = {
			mergeReport: true,                      // mergeReport 是否合并上报， false 关闭， true 启动（默认）
		    delay: 1000,                            // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
		    url: "xxxxxxxx",                        // 指定错误上报地址
		    except: [/Script error/i],              // 忽略某个错误
		    random: 1,                              // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
		    repeat: 5,                              // 重复上报次数(对于同一个错误超过多少次不上报)
		    //errorLSSign:'mx-error'                  // error错误数自增 0
		    //maxErrorCookieNo:50,                    // error错误数自增 最大的错
		    tryPeep: false,
		    peepSystem: false,
		    peepJquery: false,
		    peepConsole: true
		};
		Object.assign(_config, options);    /// this.config
	};
	peepSystem(){

	};
	peepJquery(){

	};
	peepConsole(){

	};
	peepModule(){

	};
	peepCustom(){
		
	};
	set (name, value) {

	};
	get (name) {

	};

}

