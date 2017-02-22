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
        this.mergeTimeout = null;
        this.url = this.config.url;
        this.srcs = [];
        [ 'log', 'debug', 'info', 'warn', 'error' ].forEach( ( type, index ) => {
            this[ type ] = ( msg ) => {
                this.handleMsg( msg, type, index );
            };
        } );

    }
    repeat( error ) {
        let repeatName = error.rowNum === undefined || error.colNum === undefined ?
            error.msg :
            error.msg + error.rowNum + error.colNum;
        this.repeatList[ repeatName ] = this.repeatList[ repeatName ] === undefined ? 1 : this.repeatList[ repeatName ] + 1;
        //this.repeatList[repeatName] = this.repeatList[repeatName] > this.config.repeat ? this.config.repeat : this.repeatList[repeatName];
        return this.repeatList[ repeatName ] <= this.config.repeat;
    }
    report( cb ) {
        let parames = '';
        let queue = this.errorQueue;
        if ( this.config.mergeReport ) {
            // 合并上报
            // console.log( '合并上报' );
            parames = queue.map( obj => {
                this.setItem( obj );
                return utils.serializeObj( obj );
            } ).join( '|' );
        } else {
            // 不合并上报
            //console.log( '不合并上报' );
            if ( queue.length ) {
                let obj = queue[ 0 ];
                this.setItem( obj );
                parames = utils.serializeObj( obj );
            }
        }
        this.url += '?' + parames;
        let oImg = new Image();
        oImg.onload = function () {
            queue.forEach( ( v ) => {
                localStorage.setItem( 'mes', utils.stringify( v ) ); //errorObj  to string 再存localStorage
            } );
            queue = [];
            //utils.stringify({"mes" : error});  //????????????????
            if ( cb ) {
                cb.call( this );
            }
            this.trigger( 'afterReport' );
        }.bind( this );
        oImg.src = this.url;
        this.srcs.push( oImg.src );
        //console.log( this.srcs );
    }
    // 发送
    send( isNowReport, cb ) {
        this.trigger( 'beforeReport' );
        let callback = arguments.length === 1 ? isNowReport : cb;
        if ( isNowReport ) {
            // 现在上报
            this.report( callback );

        } else {
            // 延迟上报
            this.mergeTimeout = setTimeout( function () {
                this.report( callback );
            }.bind( this ), this.config.delay );
        }
    }
    // push错误到pool
    carryError( error ) {
        if ( !error ) {
            //console.warn( 'carryError方法内 error 参数为空' );
            return;
        }
        // 拿到onerror的参数 先判断重复 抽样 再放数组中

        var rnd = Math.random();
        if ( rnd >= this.config.random ) {
            //console.warn( '抽样' + rnd + '|||' + this.config.random );
            return error;
        }
        //console.warn( '不抽样' );
        //console.log(this.repeat(error))


        this.repeat( error ) && this.errorQueue.push( error );


    }

    // 手动上报 处理方法:全部立即上报 需要延迟吗?
    handleMsg( msg, type, level ) {
        if ( !msg ) {
            console.warn( type + '方法内 msg 参数为空' );
            return;
        }
        let errorMsg = !utils.typeDecide( msg, 'Object' ) ? {
            msg: msg
        } : msg;
        errorMsg.level = level;
        errorMsg = Object.assign( utils.getSystemParams(), errorMsg );
        this.carryError( errorMsg );
        this.send();
        return errorMsg;
    }
}

export default Report;