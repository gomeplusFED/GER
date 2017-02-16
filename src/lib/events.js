/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */

import Peep from './peep';
class Events  extends Peep{
	constructor(){
        super();
		this.handlers = {};
	}
    on(event, handler){
    	if( typeof event === "string" && typeof handler === "function" ){
	    	this.handlers[event] = typeof this.handlers[event] === "undefined" ? [] : this.handlers[event];
	        this.handlers[event].push(handler);
    	}
    }
    off( event ) {
        this.handlers[event] !== undefined && delete  this.handlers[event];
    }
    trigger( event ) {
        if(this.handlers[event] instanceof Array){
            this.handlers[event].forEach(function(v,i){
                this.handlers[event][i]();
            }.bind(this));
        }
        return this.handlers[event] !== undefined;
    }

}

export default Events;