/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

import utils from "./utils";

let Report = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        super( options );
        this.errorQueue = [];
        this.repeatList = {};
        this.url = this.config.url;
        [ 'log', 'debug', 'info', 'warn', 'error' ].forEach( ( type, index ) => {
            this[ type ] = ( msg ) => {
                return this.handleMsg( msg, type, index );
            };
        } );

    }
    repeat( error ) {
        let rowNum = error.rowNum || '';
        let colNum = error.colNum || '';
        let repeatName = error.msg + rowNum + colNum;
        this.repeatList[ repeatName ] = this.repeatList[ repeatName ] ? this.repeatList[ repeatName ] + 1 : 1;
        return this.repeatList[ repeatName ] > this.config.repeat;
    }
    request( url, cb ) {
        let img = new window.Image();
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
        this.url += parames;
        this.request( this.url, () => {
            if ( mergeReport ) {
                queue = [];
            }
            if ( cb ) {
                cb.call( this );
            }
            this.trigger( 'afterReport' );
        } );
        return this.url;
    }
    // 发送
    send( cb ) {
        if ( !this.trigger( 'beforeReport' ) ) return;
        let callback = cb || utils.noop;
        let delay = this.config.mergeReport ? this.config.delay : 0;

        setTimeout( () => {
            this.report( callback );
        }, delay );

    }
    except( error ) {
        let oExcept = this.config.except;
        let result = false;
        let v = null;
        if ( utils.typeDecide( oExcept, "Array" ) ) {
            for ( let i = 0, len = oExcept.length; i < len; i++ ) {
                v = oExcept[ i ];
                if ( ( utils.typeDecide( v, "RegExp" ) && v.test( error.msg ) ) ||
                    ( utils.typeDecide( v, "Function" ) && v( error, error.msg ) ) ) {
                    result = true;
                    break;
                }
            }
        }
        return result;

    }
    // push错误到pool
    catchError( error ) {
        var rnd = Math.random();
        if ( rnd >= this.config.random ) {
            return false;
        }
        if ( this.repeat( error ) ) {
            return false;
        }
        if ( this.except( error ) ) {
            return false;
        }
        this.errorQueue.push( error );
        return this.errorQueue;
    }
    // 手动上报 
    handleMsg( msg, type, level ) {
        if ( !msg ) {
            console.warn( type + '方法内 msg 参数为空' );
            return;
        }
        //console.log(msg.msg)
        let errorMsg = utils.typeDecide( msg, 'Object' ) ? msg : {
            msg: msg
        };
        errorMsg.level = level;
        errorMsg.rolNum = '';
        errorMsg.colNum = '';
        errorMsg.targetUrl = '';
        errorMsg = utils.assignObject( utils.getSystemParams(), errorMsg );
        if ( this.catchError( errorMsg ) ) {
            this.send();
        }
        return errorMsg;
    }
};

export default Report;