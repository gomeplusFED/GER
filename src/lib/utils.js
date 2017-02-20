/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var utils = {
    fnLazyLoad: function ( b, fn1, fn2 ) {
        return b ? fn1 : fn2;
    }(),
    typeDecide: function ( o, type ) {
        return Object.prototype.toString.call( o ) === "[object " + type + "]";
    },
    serializeObj: function ( obj ) {
        let parames = '';
        Object.keys( obj ).forEach( name => {
            parames += name + '=' + obj[ name ] + '&';
        } );
        return parames;
    },
    stringify: function ( obj ) {
        if ( JSON.stringify ) {
            return JSON.stringify( obj );
        } else {
            let sep = '';
            return '{' + Object.keys( obj ).map( ( k ) => {
                sep = typeof obj[ k ] === 'number' ? '' : '"';
                return '"' + k + '"' + ':' + sep + obj[ k ] + sep;
            } ).join( ',' ) + '}';
        }
    },
    parse: function ( str ) {
        return JSON.parse ? JSON.parse( str ) : new Function( 'return ' + str )();
    },
    getServerPort: function () {
        return window.location.port === '' ? ( window.location.protocol === 'http:' ? '80' : '443' ) : window.location.port;
    },
    getUserAgent: function () {
        return navigator.userAgent;
    },
    getPlatType: function () {
        return !!utils.getUserAgent().match( /Mobile/ ) ? 'Mobile' : 'PC';
    },
    getSystemParams: function () {
        return {
            userAgent: utils.getUserAgent(),
            currentUrl: document.location.href,
            timestamp: +new Date(),
            projectType: utils.getPlatType()
        };
    },
    toArray: function( arr ){
        return Array.prototype.slice.call(arr);
    },
    getCookie: function( key ){
        let cookieList = document.cookie.split('; ');
        let str = '';
        for(var i = 0 ; i < cookieList.length; i++){
            var item = cookieList[i].split('=');
            if( item[0] == key ){
                str = item[1];
                break;
            }
        }
        return str;
    },
    addCookie: function( name, value, days ){
        var times = new Date();
        times.setDate( times.getDate() + days );
        document.cookie = name + "="+ value +"; expires=" + times.toGMTString();
    },
    clearCookie: function( value ){
        utils.addCookie( value, '', -1 );
    }
};

export default utils;