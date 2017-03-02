/**
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */
let Config = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        super( options );
        this.config = {
            proxyAll: true,
            mergeReport: false, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
            delayReport: false, // delayReport 是否合并上报， false 关闭， true 启动（默认）
            delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
            url: "ewewe", // 指定错误上报地址
            except: [ /Script error/i ], // 忽略某个错误
            random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
            repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
            errorLSSign: 'mx-error', // error错误数自增 0
            maxErrorCookieNo: 20, // error错误数自增 最大的错
            validTime: 7
        };
        this.config = Object.assign( this.config, options );
    }
    get( name ) {
        return this.config[ name ];
    }
    set( name, value ) {
        this.config[ name ] = value;
    }

};

export default Config;