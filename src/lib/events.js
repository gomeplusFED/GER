/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */

import Peep from './peep';
class Events extends Peep{
	constructor(){
		super();
        console.log(JSON.stringify(this), 'events');
		this.handlers = {};
	}
    on(event, handler){
    	if( typeof event === "string" && typeof handler === "function" ){
	    	this.handlers[event] = this.handlers[event] ? this.handlers[event].push(handler) : [handler];
    	}
    }
    off( event ) {
        if(this.handlers[event]){
            delete this.handlers[event];
        } 
    }
    trigger( event,args ) {
        if(this.handlers[event].length){
            return this.handlers[event].every((v,i)=>{
                var ret = this.handlers[event][i].apply(this,args);
                return ret === false ? false : true;
            });
        }
    }

}

export default Events;