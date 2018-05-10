/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

import utils from "./utils";

let Report = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        super( options );
        this.repeatList = {};
        [ 'log', 'debug', 'info', 'warn', 'error' ].forEach( ( type, index ) => {
            this[ type ] = ( msg ) => {
                return this.handleMsg( msg, type, index );
            };
        } );
        // 发从之前存储数据
        this.on('beforeSend', ()=>{
          this.queue.get.map( obj => {
            this.setItem( obj );
          });
          this.queue.post.map( obj => {
            this.setItem( obj );
          });
        });
    }
    repeat( error ) {
        let rowNum = error.rowNum || '';
        let colNum = error.colNum || '';
        let repeatName = error.msg + rowNum + colNum;
        this.repeatList[ repeatName ] = this.repeatList[ repeatName ] ? this.repeatList[ repeatName ] + 1 : 1;
        return this.repeatList[ repeatName ] > this.config.repeat;
    }
    // 发送
    send( cb ) {
       this.delayReport(cb);
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
    catchError( error, type ) {
        type = type || 'get';
        this.catchData(type, error);
        return this.queue[type];
    }
    // 手动上报 
    handleMsg( msg, type, level ) {
        if ( !msg ) {
            return false;
        }
        if( utils.typeDecide( msg, 'Object' ) && !msg.msg ){
            return false;
        }

        if ( utils.typeDecide( msg, 'Error' ) ) {
            msg = {
                msg: msg.message,
                ext: {
                    stack: msg.stack
                }
            };
        }

        let errorMsg = utils.typeDecide( msg, 'Object' ) ? msg : {
            msg: msg,
            level: level
        };
        errorMsg = utils.assignObject( utils.getSystemParams(this.config), errorMsg );

         if ( !this.repeat( errorMsg ) && !this.except( errorMsg )) {
            this.reportByGet(errorMsg);
         }
        return errorMsg;
    }
};

export default Report;
