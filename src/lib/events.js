/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */

let Events = ( supperclass ) => class extends supperclass {
    constructor( options ) {
        super( options );
        this.handlers = {};
    }
    on( event, handler ) {
        this.handlers[ event ] = this.handlers[ event ] || [];
        this.handlers[ event ].push( handler );
        return this.handlers[event];
    }
    off( event ) {
        if ( this.handlers[ event ] ) {
            delete this.handlers[ event ];
        }
    }
    trigger( event, args ) {
        let funcs = this.handlers[ event ];
        if ( funcs ) {
            return funcs.every( ( f ) => {
                var ret = f.apply( this, args );
                return ret === false ? false : true;
            } );
        }
        return false;
    }

};

export default Events;