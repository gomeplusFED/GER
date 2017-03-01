/**
 * @author  zdongh2016
 * @fileoverview  Peep
 * @date 2017/02/16
 */

import Config from './config';
import utils from './utils';


class Peep extends Config {
    constructor( options ) {
        super( options );
        this.timeoutkey = null;
        this.consoleList = {};
        window.onload = () => {
            this.peep();
        };
        this.config.peepSystem && this.peepSystem();
        if ( this.config.peepConsole ) {
            [ 'log', 'debug', 'info', 'warn', 'error' ].forEach( ( type, index ) => {
                window.console[ type ] = this.peepConsole( window.console[ type ], type, index );
            } );
        }

    }
    peep() {
        if ( this.config.tryPeep ) {
            this.config.peepJquery && this.peepJquery();
            this.config.peepModule && this.peepModule();
            this.config.peepCustom && this.peepCustom();
        }
    }
    cat( func, args ) {
        return function () {
            try {
                return func.apply( this, args || arguments );
            } catch ( error ) {

                this.trigger( 'tryError', [ error ] );
                if ( error.stack && console && console.error ) {
                    console.error( "[GER]", error.stack );
                }
                if ( !this.timeoutkey ) {
                    let orgOnerror = window.onerror;
                    window.onerror = utils.noop;
                    this.timeoutkey = setTimeout( () => {
                        window.onerror = orgOnerror;
                        this.timeoutkey = null;
                    }, 50 );
                }
                throw error;
            }
        };
    }

    catArgs( func ) {
        return function () {
            let args = [];
            utils.toArray( arguments ).forEach( ( v ) => {
                utils.typeDecide( v, 'Function' ) && ( v = this.cat( v ) );
                args.push( v );
            } );
            return func.apply( this, args );
        }.bind( this );
    }

    catTimeout( func ) {
        return function ( cb, timeout ) {
            if ( utils.typeDecide( cb, 'String' ) ) {
                try {
                    cb = new Function( cb );
                } catch ( err ) {
                    throw err;
                }
            }
            let args = utils.toArray( arguments );
            cb = this.cat( cb, args.length && args );
            return func( cb, timeout );
        }.bind( this );
    }

    makeArgsTry( func, self ) {
        return function () {
            let tmp, args = [];

            utils.toArray( arguments ).forEach( v => {
                utils.typeDecide( v, 'Function' ) && ( tmp = this.cat( v ) ) &&
                    ( v.tryWrap = tmp ) && ( v = tmp );

                args.push( v );
            } );
            return func.apply( self || this, args );
        }.bind( this );
    }
    makeObjTry( obj ) {
        let key;
        let value;
        let that = this;
        for ( key in obj ) {
            if ( obj.hasOwnProperty( key ) ) {
                value = obj[ key ];
                if ( utils.typeDecide( value, 'Function' ) ) {
                    obj[ key ] = that.cat( value );
                }
            }
        }
        return obj;
    }

    // 劫持原生js
    peepSystem() {
        window.setTimeout = this.catTimeout( setTimeout );
        window.setInterval = this.catTimeout( setInterval );
    }

    // 劫持jquery
    peepJquery() {
        let _$ = window.$;

        if ( !_$ || !_$.event ) {
            return this;
        }

        let _add, _remove;
        if ( _$.zepto ) {
            _add = _$.fn.on, _remove = _$.fn.off;

            _$.fn.on = this.makeArgsTry( _add );
            _$.fn.off = function () {
                let args = [];
                utils.toArray( arguments ).forEach( v => {
                    utils.typeDecide( v, 'Function' ) && v.tryWrap && ( v = v.tryWrap );
                    args.push( v );
                } );
                return _remove.apply( this, args );
            };

        } else if ( window.jQuery ) {
            _add = _$.event.add, _remove = _$.event.remove;

            _$.event.add = this.makeArgsTry( _add );
            _$.event.remove = function () {
                let args = [];
                utils.toArray( arguments ).forEach( v => {
                    utils.typeDecide( v, 'Function' ) && v.tryWrap && ( v = v.tryWrap );
                    args.push( v );
                } );
                return _remove.apply( this, args );
            };
        }

        let _ajax = _$.ajax;

        if ( _ajax ) {
            _$.ajax = function ( url, setting ) {
                if ( !setting ) {
                    setting = url;
                    url = undefined;
                }
                this.makeObjTry( setting );
                if ( url ) return _ajax.call( _$, url, setting );
                return _ajax.call( _$, setting );
            };
        }
    }

    carryConsole() {

    }
    peepConsole( func, type, level ) {
        return function () {
            let mergeReport = this.config.mergeReport;
            if ( !mergeReport ) {
                this.on( 'beforeReport', () => {
                    this.config.mergeReport = true;
                } );
                this.on( 'afterReport', () => {
                    this.config.mergeReport = mergeReport;
                } );
            }
            let msg = utils.toArray( arguments ).join( ',' );
            this.consoleList[ type ] = this.consoleList[ type ] !== undefined ? this.consoleList[ type ] : [];
            this.consoleList[ type ].push(
                Object.assign( utils.getSystemParams(), {
                    msg: msg,
                    level: level
                } )
            );
            if ( this.consoleList[ type ].length > 10 ) {
                this.errorQueue = this.errorQueue.concat( this.consoleList[ type ] );
                this.send( true );
                this.consoleList[ type ] = [];
            }
            return func.apply( this, arguments );
        }.bind( this );
    }
    // 劫持seajs
    peepModules() {
        var _require = window.require,
            _define = window.define;
        if ( _define && _define.amd && _require ) {
            window.require = this.catArgs( _require );
            Object.assign( window.require, _require );
            window.define = this.catArgs( _define );
            Object.assign( window.define, _define );
        }

        if ( window.seajs && _define ) {
            window.define = function () {
                var arg, args = [];
                utils.toArray( arguments ).forEach( ( v, i ) => {
                    if ( utils.typeDecide( 'v', 'Function' ) ) {
                        v = this.cat( v );
                        v.toString = ( function ( orgArg ) {
                            return function () {
                                return orgArg.toString();
                            };
                        }( arguments[ i ] ) );
                    }
                    args.push( arg );
                } );
                return _define.apply( this, args );

            };

            window.seajs.use = this.catArgs( window.seajs.use );

            Object.assign( window.define, _define );
        }

    }

    // 劫持自定义方法
    peepCustom() {

        this.config.peepCustom.forEach( ( v ) => {
            if ( utils.typeDecide( v, 'Function' ) ) {
                return function () {
                    utils.toArray( arguments ).forEach( ( f ) => {
                        if ( utils.typeDecide( f, 'Function' ) ) {
                            this.cat( f );
                        } else {
                            this.makeObjTry( f );
                        }
                    } );
                };
            } else {
                this.error( {
                    msg: '自定义方法类型必须为function',
                    level: 4
                } );
                //console.error('自定义方法类型必须为function');
            }
        } );

    }
}
export default Peep;