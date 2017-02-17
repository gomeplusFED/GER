/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var utils = {
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
    parse: function(str){
        return JSON.parse ? JSON.parse(str) : eval('(' + str +')');
    },
    getServerPort: function(){
        return window.location.port === '' ? ( window.location.protocol === 'http:' ? '80' : '443' ) : window.location.port;
    },
    getUserAgent:function() {
        return navigator.userAgent;
    },
    getPlatType:function(){
        return !!utils.getUserAgent().match(/Mobile/) ? 'Mobile' : 'PC';
    },
    getSystemParams: function(){
        return {
            userAgent: utils.getUserAgent(),
            currentUrl: document.location.href,
            timestamp: + new Date(),
            projectType: utils.getPlatType()
        };
    }
};

export default utils;