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
    }
};

export default utils;