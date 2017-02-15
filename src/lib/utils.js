var utils = {
    typeDecide: function ( o, type ) {
        return Object.prototype.toString.call( o ) === "[object " + type + "]";
    }
};

export default utils;