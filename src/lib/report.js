/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

import utils from "./utils";
import Events from "./events";

class Report extends Events {

    constructor( options ) {
        super( options );
        this.errorQueue = [];
        this.repeatList = {};
        this.url = this.config.url;
        [ 'log', 'debug', 'info', 'warn', 'error' ].forEach( ( type, index ) => {
            this[ type ] = ( msg ) => {
                this.handleMsg( msg, type, index );
            };
        } );

    }
    repeat( error ) {
        let rowNum = error.rowNum || '';
        let colNum = error.colNum || '';
        let repeatName = error.msg + rowNum + colNum;
        this.repeatList[ repeatName ] = this.repeatList[ repeatName ] ? 1 : this.repeatList[ repeatName ] + 1;
        return this.repeatList[ repeatName ] > this.config.repeat;
    }
    request( url, cb ) {
        let img = new Image();
        img.onload = cb;
        img.src = url;
    }
    report( cb ) {
        let mergeReport = this.config.mergeReport;
        let queue = this.errorQueue;
        let curQueue = mergeReport ? queue : [ queue.shift() ];
        // 合并上报
        let parames = curQueue.map( obj => {
            this.setItem( obj );
            return utils.serializeObj( obj );
        } ).join( '|' );
        this.url += '?' + parames;
        this.request( this.url, () => {
            if ( mergeReport ) {
                queue = [];
            }
            if ( cb ) {
                cb.call( this );
            }
            this.trigger( 'afterReport' );
        } );
    }
    // 发送
    send( isNowReport, cb ) {
        this.trigger( 'beforeReport' );
        let callback = cb || utils.noop;
        let delay = isNowReport ? 0 : this.config.delay;
        setTimeout( () => {
            this.report( callback );
        }, delay );
    }
    // push错误到pool
    carryError( error ) {
        var rnd = Math.random();
        if ( rnd < this.config.random ) {
            return false;
        }
        //console.warn( '不抽样' );
        //console.log(this.repeat(error))
        if ( this.repeat( error ) ) {
            return false;
        }
        this.errorQueue.push( error );
        return true;
    }

    // 手动上报 处理方法:全部立即上报 需要延迟吗?
    handleMsg( msg, type, level ) {
        if ( !msg ) {
            console.warn( type + '方法内 msg 参数为空' );
            return;
        }
        let errorMsg = utils.typeDecide( msg, 'Object' ) ? msg : {
            msg: msg
        };
        errorMsg.level = level;
        errorMsg = Object.assign( utils.getSystemParams(), errorMsg );
        if ( this.carryError( errorMsg ) ) {
            this.send( this.config.delayReport );
        }
        return errorMsg;
    }
}

export default Report;