/**
 * @author  zdongh2016
 * @fileoverview  Peep
 * @date 2017/02/16
 */

import utils from './utils';

let proxy = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        super( options );
        this.consoleList = {};

        this.timeoutkey = null;
        this.proxy();
        /*window.onload = () => {
            this.proxy();
        };*/
    }
    proxy() {
        let _config = this.config;
        if ( _config.proxyAll ) {
            this.proxyJquery().proxyModules().proxyTimer().proxyConsole();
        } else {
            _config.proxyJquery && this.proxyJquery();
            _config.proxyModules && this.proxyModules();
            _config.proxyTimer && this.proxyTimer();
            _config.proxyConsole && this.proxyConsole();
        }
    }
    proxyConsole() {
        [ 'log', 'debug', 'info', 'warn', 'error' ].forEach( ( type, index ) => {
            let _console = window.console[ type ];
            window.console[ type ] = (...params) => {
                this.reportConsole( _console, type, index, utils.toArray( params ) );
            };
        } );
        return this;
    }
    // 劫持原生js
    proxyTimer() {
        window.setTimeout = this.catTimeout( setTimeout );
        window.setInterval = this.catTimeout( setInterval );
        return this;
    }
    // 劫持jquery
    proxyJquery( $ ) {
        let _$ = $ || window.$;

        if ( !_$ || !_$.event ) {
            return this;
        }

        let _add, _remove;
        if ( _$.zepto ) {
            _add = _$.fn.on, _remove = _$.fn.off;

            _$.fn.on = this.makeArgsTry( _add );
            
            _$.fn.off = function(){
                let args = [];
                utils.toArray( arguments ).forEach( v => {
                    utils.isFunction( v ) && v.tryWrap && ( v = v.tryWrap );
                    args.push( v );
                } );
                return _remove.apply( this, args );
            };

        } else if ( _$.fn.jquery ) {
            _add = _$.event.add, _remove = _$.event.remove;

            _$.event.add = this.makeArgsTry( _add );
            _$.event.remove = (...params) => {
                let args = [];

                utils.toArray( params ).forEach( v => {
                    utils.typeDecide( v, 'Function' ) && v.tryWrap && ( v = v.tryWrap );
                    args.push( v );
                } );
                return _remove.apply( this, args );
            };
        }

        let _ajax = _$.ajax;

        if ( _ajax ) {
            _$.ajax = ( url, setting ) => {
                if ( !setting ) {
                    setting = url;
                    url = undefined;
                }
                this.makeObjTry( setting );
                if ( url ) return _ajax.call( _$, url, setting );
                return _ajax.call( _$, setting );
            };
        }
        return this;
    }
    reportConsole( func, type, level, args ) {
        this.on( 'beforeReport', () => {
            //启用console，强制merge
            this.config.mergeReport = true;
        } );
        let msg = '';
        args.forEach( v => {
            if ( utils.typeDecide( v, 'string' ) ) {
                msg += v;
            } else if ( utils.typeDecide( v, 'array' ) ) {
                msg += ( '[' + v.join( ',' ) + ']' );
            } else {
                msg += utils.stringify( v );
            }
        } );
        let typeList = this.consoleList[ type ];
        typeList = typeList || [];
        typeList.push(
            utils.assignObject( utils.getSystemParams(), {
                msg: msg,
                level: level,
                rowNum: '',
                colNum: '',
                targetUrl: ''
            } )
        );
        if ( typeList.length > 10 ) {
            this.errorQueue = this.errorQueue.concat( typeList );
            this.send( true, () => {
                typeList = [];
            } );
        }
        return func.apply( this, args );
    }
    // 劫持seajs
    proxyModules() {
        var _require = window.require,
            _define = window.define;

        if ( _define && _define.amd && _require ) {
            window.require = this.catArgs( _require );
            utils.assignObject( window.require, _require );

            window.define = this.catArgs( _define );
            utils.assignObject( window.define, _define );
        }
        if ( window.seajs && _define ) {
            var _this = this;
            window.define = function () {
                var arg, args = [];
                for ( var i = 0, l = arguments.length; i < l; i++ ) {
                    arg = arguments[ i ];
                    if ( utils.isFunction( arg ) ) {
                        arg = _this.cat( arg );
                        //seajs should use toString parse dependencies , so rewrite it
                        arg.toString = ( function ( orgArg ) {
                            return function () {
                                return orgArg.toString();
                            };
                        }( arguments[ i ] ) );
                    }
                    args.push( arg );
                }
                return _define.apply( this, args );
            };
            window.seajs.use = this.catArgs( window.seajs.use );

            utils.assignObject( window.define, _define );
        }
        return this;

    }
    // 劫持自定义方法
    proxyCustomFn( func ) {
        return this.cat( func );

    }
    proxyCustomObj( obj ) {
        return this.makeObjTry( obj );
    }

    cat( func, args ) {
        return ( ...param ) => {
            try {
                args = args || utils.toArray( param );
                return func.apply( this, args );
            } catch ( error ) {
                var err = utils.getErrorInfo(error);
                this.trigger( 'tryError', [ err ] );
                this.error( err );
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
        return ( ...params ) => {
            let args = [];
            utils.toArray( params ).forEach( ( v ) => {
                utils.isFunction( v ) && ( v = this.cat( v ) );
                args.push( v );
            } );
            return func.apply( window, args );
        };
    }

    catTimeout( func ) {
        return ( ...params ) => {
            let timeArgs = utils.toArray(params);
            let cb = timeArgs[0];
            let timeout = timeArgs[1];
            if ( utils.isString( cb ) ) {
                try {
                    cb = new Function( cb );
                } catch ( err ) {
                    throw err;
                }
            }
            // for setTimeout(function, delay, param1, ...)
            let args = timeArgs.splice(2);

            cb = this.cat( cb, args.length && args );

            return func( cb, timeout );
        };
    }
    makeArgsTry( func, self ) {
        var _this = this;
        return function() {  //this指向 故：不能使用箭头函数   
            var tmp, args = [];
            utils.toArray(arguments).forEach(v => {
                utils.isFunction(v) && (tmp = _this.cat(v)) &&
                    (v.tryWrap = tmp) && (v = tmp);
                args.push(v);
            });
            return func.apply(self || this, args);
        };

    }
    makeObjTry( obj ) {
        let key;
        let value;
        for ( key in obj ) {
            if ( obj.hasOwnProperty( key ) ) {
                value = obj[ key ];
                if ( utils.isFunction( value ) ) {
                    obj[ key ] = this.cat( value );
                }
            }
        }
        return obj;
    }
};
export default proxy;