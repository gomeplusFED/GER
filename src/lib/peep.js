/**
 * @author  zdongh2016
 * @fileoverview  Peep
 * @date 2017/02/16
 */

//import LocalStorage from './localStorage';


class Peep /* extends LocalStorage*/ {
    constructor( options ) {
        //super(options);
        console.log( options );
        let that = this;
        window.onload = function () {
            that.peep();
        };

        //判断加载完成   
        // window.onload之后再次设置定时器判断
    }
    peep() {
        if ( this.config.tryPeep ) {
            this.config.peepSystem && this.peepSystem();
            this.config.peepJquery && this.peepJquery();
            this.config.peepConsole && this.peepConsole();
            this.config.peepModule && this.peepModule();
            this.config.peepCustom && this.peepCustom();
        }
    }

    // 劫持原生js
    peepSystem() {

    }

    // 劫持jquery
    peepJquery() {
        /*
        // 保存之前的$.ajax
        $._ajax = $.ajax;
        function noop() {}
        // 我想要加入的功能
        function cb(data) {
            console.log(data);
            // do something you want
        }
        // ajax 填充新代码
        function myAjax(e, n) {
            e._success = e.success || noop;
            e.success = function success(data) {
                cb(data);x`
                e._success.call(this, data);
            };
            $._ajax(e, n);
        }
        // ajax重新赋值
        $.ajax = myAjax;
        */
    }

    // 劫持console
    peepConsole() {

    }

    // 劫持seajs
    peepModule() {

    }

    // 劫持自定义方法
    peepCustom() {

    }
}
export default Peep;