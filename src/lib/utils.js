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
    }
};

export default utils;