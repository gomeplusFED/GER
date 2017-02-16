/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */
class Events {
	constructor(){
		this.handlers = {};
	}
    on(type, handler){
    	if( typeof type === "string" && typeof handler === "function" ){
	    	this.handlers[type] = typeof this.handlers[type] === "undefined" ? [] : this.handlers[type];
	        this.handlers[type].push(handler);
    	}
    }
    off() {

    }
    trigger( event ) {
        if(this.handlers[event] instanceof Array){
            var handlers=this.handlers[event];
            handlers.forEach((v,i)=>{
            	handlers[i]();
            });
        }
    }

}

export default Events;