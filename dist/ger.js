(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.GER = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var timeoutkey;

var utils = {
    typeDecide: function typeDecide(o, type) {
        return Object.prototype.toString.call(o) === "[object " + type + "]";
    },
    isFunction: function isFunction(f) {
        return utils.typeDecide(f, 'Function');
    },
    isString: function isString(f) {
        return utils.typeDecide(f, 'String');
    },
    serializeObj: function serializeObj(obj) {
        var parames = '';
        Object.keys(obj).forEach(function (name) {
            parames += name + '=' + obj[name] + '&';
        });
        return parames;
    },
    stringify: function stringify(obj) {
        if (window.JSON) {
            return JSON.stringify(obj);
        }
        var t = typeof obj === "undefined" ? "undefined" : _typeof(obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n,
                v,
                json = [],
                arr = obj && obj.constructor == Array;

            // fix.
            var self = arguments.callee;

            for (n in obj) {
                if (obj.hasOwnProperty(n)) {

                    v = obj[n];
                    t = typeof v === "undefined" ? "undefined" : _typeof(v);
                    if (obj.hasOwnProperty(n)) {
                        if (t == "string") v = '"' + v + '"';else if (t == "object" && v !== null)
                            // v = jQuery.stringify(v);
                            v = self(v);
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    },
    parse: function parse(str) {
        return JSON.parse ? JSON.parse(str) : new Function('return ' + str)();
    },
    getServerPort: function getServerPort() {
        return window.location.port === '' ? window.location.protocol === 'http:' ? '80' : '443' : window.location.port;
    },
    getUserAgent: function getUserAgent() {
        return navigator.userAgent;
    },
    getPlatType: function getPlatType() {
        try {
            document.createEvent("TouchEvent");
            return 'Mobile';
        } catch (e) {
            return 'PC';
        }
    },
    flashVer: function flashVer() {
        var f = "-";
        var n = navigator;
        var ii = void 0;
        if (n.plugins && n.plugins.length) {
            for (ii = 0; ii < n.plugins.length; ii++) {
                if (n.plugins[ii].name.indexOf('Shockwave Flash') !== -1) {
                    f = n.plugins[ii].description.split('Shockwave Flash ')[1];
                    break;
                }
            }
        } else if (window.ActiveXObject) {
            for (ii = 10; ii >= 2; ii--) {
                try {
                    var fl = new Function("return new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');")();
                    if (fl) {
                        f = ii + '.0';
                        break;
                    }
                } catch (e) {}
            }
        }
        return f;
    },
    // 从字符串 src 中查找 k+sp 和  e 之间的字符串，如果 k==e 且 k 只有一个，或者 e 不存在，从 k+sp 截取到字符串结束
    // abcd=1&b=1&c=3;
    // abdc=1;b=1;a=3;
    stringSplice: function stringSplice(src, k, e, sp) {
        if (src === "") {
            return "";
        }
        sp = sp === "" ? "=" : sp;
        k += sp;
        var ps = src.indexOf(k);
        if (ps < 0) {
            return "";
        }
        ps += k.length;
        var pe = pe < ps ? src.length : src.indexOf(e, ps);
        return src.substring(ps, pe);
    },
    getReferer: function getReferer() {
        var ref = document.referrer.toLowerCase();
        var re = /^[^\?&#]*.swf([\?#])?/;
        // 如果页面 Referer 为空，从 URL 中获取
        if (ref === "" || ref.match(re)) {
            ref = utils.stringSplice(window.location.href, "ref", "&", "");
            if (ref !== "") {
                return encodeURIComponent(ref);
            }
        }
        return encodeURIComponent(ref);
    },
    getSystemParams: function getSystemParams() {
        var scr = window.screen;
        return {
            userAgent: utils.getUserAgent(),
            currentUrl: document.location.href,
            timestamp: +new Date(),
            projectType: utils.getPlatType(),
            flashVer: utils.flashVer(),
            title: document.title,
            screenSize: scr.width + "x" + scr.height,
            referer: document.referer ? document.referer : ''
        };
    },
    toArray: function toArray$$1(arr) {
        return Array.prototype.slice.call(arr);
    },
    getCookie: function getCookie(key) {
        var cookieList = document.cookie.split('; ');
        var str = '';
        for (var i = 0; i < cookieList.length; i++) {
            var item = cookieList[i].split('=');
            if (item[0] == key) {
                str = item[1];
                break;
            }
        }
        return str;
    },
    addCookie: function addCookie(name, value, days) {
        var times = new Date();
        times.setDate(times.getDate() + (days || 365));
        document.cookie = name + "=" + value + "; expires=" + times.toGMTString();
        return utils.getCookie(name);
    },
    noop: function noop() {},
    clearCookie: function clearCookie(name) {
        utils.addCookie(name, '', -1);
        return utils.getCookie(name);
    },
    cat: function cat(func, args) {
        return function () {
            try {
                args = args || utils.toArray(arguments);
                return func.apply(this, args);
            } catch (error) {
                this.trigger('tryError', [error]);
                if (error.stack && console && console.error) {
                    console.error("[GER]", error.stack);
                }
                if (!timeoutkey) {
                    var orgOnerror = window.onerror;
                    window.onerror = utils.noop;
                    timeoutkey = setTimeout(function () {
                        window.onerror = orgOnerror;
                        timeoutkey = null;
                    }, 50);
                }
                throw error;
            }
        };
    },
    catArgs: function catArgs(func) {
        return function () {
            var args = [];
            utils.toArray(arguments).forEach(function (v) {
                utils.isFunction(v) && (v = utils.cat(v));
                args.push(v);
            });
            return func.apply(this, args);
        };
    },
    catTimeout: function catTimeout(func) {
        var _arguments = arguments;

        return function (cb, timeout) {
            if (utils.isString(cb)) {
                try {
                    cb = new Function(cb);
                } catch (err) {
                    throw err;
                }
            }
            var args = utils.toArray(_arguments);
            cb = utils.cat(cb, args.length && args);
            return func(cb, timeout);
        };
    },
    makeArgsTry: function makeArgsTry(func, self) {
        return function () {
            var tmp = void 0,
                args = [];
            utils.toArray(arguments).forEach(function (v) {
                utils.isFunction(v) && (tmp = utils.cat(v)) && (v.tryWrap = tmp) && (v = tmp);
                args.push(v);
            });
            return func.apply(self || this, args);
        };
    },
    makeObjTry: function makeObjTry(obj) {
        var key = void 0;
        var value = void 0;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                value = obj[key];
                if (utils.isFunction(value)) {
                    obj[key] = utils.cat(value);
                }
            }
        }
        return obj;
    },
    assignObject: function assignObject(obj1, obj2) {
        for (var name in obj2) {
            if (obj2.hasOwnProperty(name)) {
                obj1[name] = obj2[name];
            }
        }
        return obj1;
    }
};

/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */

var Events$1 = function Events(supperclass) {
    return function (_supperclass) {
        inherits(_class, _supperclass);

        function _class(options) {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

            _this.handlers = {};
            return _this;
        }

        createClass(_class, [{
            key: "on",
            value: function on(event, handler) {
                this.handlers[event] = this.handlers[event] || [];
                this.handlers[event].push(handler);
                return this.handlers[event];
            }
        }, {
            key: "off",
            value: function off(event) {
                if (this.handlers[event]) {
                    delete this.handlers[event];
                }
            }
        }, {
            key: "trigger",
            value: function trigger(event, args) {
                var _this2 = this;

                var funcs = this.handlers[event];
                if (funcs) {
                    return funcs.every(function (f) {
                        var ret = f.apply(_this2, args);
                        return ret === false ? false : true;
                    });
                }
                return false;
            }
        }]);
        return _class;
    }(supperclass);
};

/**
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */

var Config = function () {
    function Config(options) {
        classCallCheck(this, Config);

        this.config = {
            proxyAll: true,
            mergeReport: false, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
            delayReport: false, // delayReport 是否合并上报， false 关闭， true 启动（默认）
            delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
            url: "ewewe", // 指定错误上报地址
            except: [/Script error/i], // 忽略某个错误
            random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
            repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
            errorLSSign: 'mx-error', // error错误数自增 0
            maxErrorCookieNo: 20, // error错误数自增 最大的错
            validTime: 7
        };
        this.config = utils.assignObject(this.config, options);
    }

    createClass(Config, [{
        key: 'get',
        value: function get$$1(name) {
            return this.config[name];
        }
    }, {
        key: 'set',
        value: function set$$1(name, value) {
            this.config[name] = value;
            return this.config[name];
        }
    }]);
    return Config;
}();

var _arguments = arguments;
/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
var hasLocal = !!window.localStorage;

function InertLocalFunc(funcA, funcB) {
    return hasLocal ? funcA : funcB;
}

function callByArgs(func, args, global) {
    return func.apply(global, args);
}

var storage = {
    //设置cookie内json的key名
    getKey: function getKey(errorObj) {
        var isValid = function isValid(name) {
            return errorObj[name];
        };
        return ['msg', 'colNum', 'rowNum'].filter(isValid).map(isValid).join('@');
    },
    //检查是否有效
    deleteExpiresItem: function deleteExpiresItem(data) {
        var oData = data === '' ? {} : utils.parse(data);
        var date = +new Date();
        for (var key in oData) {
            if (utils.parse(oData[key]).expiresTime <= date) {
                delete oData[key];
            }
        }
        return oData;
    },
    //设置失效时间
    getEpires: function getEpires(validTime) {
        return +new Date() + 1000 * 60 * 60 * 24 * validTime;
    },
    limitError: function limitError(source, number) {
        var keys = Object.keys(source);
        if (keys.length >= number) {
            delete source[keys[0]];
        }
        return source;
    },
    //获取cookie/localStorage内容体
    setInfo: function setInfo(key, errorObj, validTime, number) {
        var source = storage.getItem(key);
        if (errorObj) {
            var errorItem = {
                expiresTime: storage.getEpires(validTime),
                value: errorObj.msg
            };
            var _key = storage.getKey(errorObj);
            source = this.limitError(source, number);
            source[_key] = utils.stringify(errorItem);
        }
        return utils.stringify(source);
    },
    //设置cookie/localStorage
    setItem: InertLocalFunc(function (key, errorObj, validTime, maxErrorCookieNo) {
        localStorage.setItem(key, callByArgs(storage.setInfo, [key, errorObj, validTime, maxErrorCookieNo], storage));
    }, function (key) {
        utils.addCookie(key, callByArgs(storage.setInfo, _arguments, storage));
    }),
    //获取cookie/localStorage
    getItem: InertLocalFunc(function (key) {
        return storage.deleteExpiresItem(localStorage.getItem(key) || '');
    }, function (key) {
        return storage.deleteExpiresItem(utils.getCookie(key));
    }),
    //清除cookie/localStorage
    clear: InertLocalFunc(function (key) {
        return key ? localStorage.removeItem(key) : localStorage.clear();
    }, function (key) {
        return key ? utils.clearCookie(key) : document.cookie.split('; ').forEach(utils.clearCookie);
    })
};

var Localstroage$1 = function Localstroage(supperclass) {
    return function (_supperclass) {
        inherits(_class, _supperclass);

        function _class(options) {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

            _this.setItem();
            return _this;
        }
        //得到元素值 获取元素值 若不存在则返回''


        createClass(_class, [{
            key: 'getItem',
            value: function getItem(key) {
                return storage.getItem(key);
            }
            // 设置一条localstorage或cookie

        }, {
            key: 'setItem',
            value: function setItem(errorObj) {
                var _config = this.config;
                storage.setItem(this.config.errorLSSign, errorObj, _config.validTime, _config.maxErrorCookieNo);
                return utils.stringify(errorObj);
            }

            //清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie

        }, {
            key: 'clear',
            value: function clear(key) {
                storage.clear(key);
            }
        }]);
        return _class;
    }(supperclass);
};

/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var Report$1 = function Report(supperclass) {
    return function (_supperclass) {
        inherits(_class, _supperclass);

        function _class(options) {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

            _this.errorQueue = [];
            _this.repeatList = {};
            _this.url = _this.config.url;
            ['log', 'debug', 'info', 'warn', 'error'].forEach(function (type, index) {
                _this[type] = function (msg) {
                    return _this.handleMsg(msg, type, index);
                };
            });

            return _this;
        }

        createClass(_class, [{
            key: 'repeat',
            value: function repeat(error) {
                var rowNum = error.rowNum || '';
                var colNum = error.colNum || '';
                var repeatName = error.msg + rowNum + colNum;
                this.repeatList[repeatName] = this.repeatList[repeatName] ? this.repeatList[repeatName] + 1 : 1;
                return this.repeatList[repeatName] > this.config.repeat;
            }
        }, {
            key: 'request',
            value: function request(url, cb) {
                var img = new Image();
                img.onload = cb;
                img.src = url;
            }
        }, {
            key: 'report',
            value: function report(cb) {
                var _this2 = this;

                var mergeReport = this.config.mergeReport;
                var queue = this.errorQueue;
                var curQueue = mergeReport ? queue : [queue.shift()];
                // 合并上报
                var parames = curQueue.map(function (obj) {
                    _this2.setItem(obj);
                    return utils.serializeObj(obj);
                }).join('|');
                this.url += '?' + parames;
                this.request(this.url, function () {
                    if (mergeReport) {
                        queue = [];
                    }
                    if (cb) {
                        cb.call(_this2);
                    }
                    _this2.trigger('afterReport');
                });
                return this.url;
            }
            // 发送

        }, {
            key: 'send',
            value: function send(isNowReport, cb) {
                var _this3 = this;

                this.trigger('beforeReport');
                var callback = cb || utils.noop;
                var delay = isNowReport ? 0 : this.config.delay;

                setTimeout(function () {
                    _this3.report(callback);
                }, delay);
            }
            // push错误到pool

        }, {
            key: 'carryError',
            value: function carryError(error) {
                var rnd = Math.random();
                if (rnd >= this.config.random) {
                    return false;
                }
                if (this.repeat(error)) {
                    return false;
                }
                this.errorQueue.push(error);
                return this.errorQueue;
            }
            // 手动上报 处理方法:全部立即上报 需要延迟吗?

        }, {
            key: 'handleMsg',
            value: function handleMsg(msg, type, level) {
                if (!msg) {
                    console.warn(type + '方法内 msg 参数为空');
                    return;
                }
                var errorMsg = utils.typeDecide(msg, 'Object') ? msg : {
                    msg: msg
                };
                errorMsg.level = level;
                errorMsg = utils.assignObject(utils.getSystemParams(), errorMsg);
                if (this.carryError(errorMsg)) {
                    this.send(this.config.delayReport);
                }
                return errorMsg;
            }
        }]);
        return _class;
    }(supperclass);
};

/**
 * @author  zdongh2016
 * @fileoverview  Peep
 * @date 2017/02/16
 */

var proxy = function proxy(supperclass) {
    return function (_supperclass) {
        inherits(_class, _supperclass);

        function _class(options) {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

            _this.consoleList = {};
            window.onload = function () {
                _this.proxy();
            };
            return _this;
        }

        createClass(_class, [{
            key: 'proxy',
            value: function proxy() {
                var _config = this.config;
                if (_config.proxyAll) {
                    this.proxyJquery().proxyModules().proxyTimer().proxyConsole();
                } else {
                    _config.proxyJquery && _config.proxyJquery();
                    _config.proxyModules && _config.proxyModules();
                    _config.proxyTimer && _config.proxyTimer();
                    _config.proxyConsole && _config.proxyConsole();
                    _config.proxyCustom && _config.proxyCustom();
                }
            }
        }, {
            key: 'proxyConsole',
            value: function proxyConsole() {
                var _this2 = this;

                ['log', 'debug', 'info', 'warn', 'error'].forEach(function (type, index) {
                    var _console = window.console[type];
                    window.console[type] = function () {
                        this.reportConsole(_console, type, index, utils.toArray(arguments));
                    }.bind(_this2);
                });
                return this;
            }
            // 劫持原生js

        }, {
            key: 'proxyTimer',
            value: function proxyTimer() {
                window.setTimeout = utils.catTimeout(setTimeout);
                window.setInterval = utils.catTimeout(setInterval);
                return this;
            }
            // 劫持jquery

        }, {
            key: 'proxyJquery',
            value: function proxyJquery($) {
                var _arguments = arguments,
                    _this3 = this;

                var _$ = $ || window.$;

                if (!_$ || !_$.event) {
                    return this;
                }

                var _add = void 0,
                    _remove = void 0;
                if (_$.zepto) {
                    _add = _$.fn.on, _remove = _$.fn.off;

                    _$.fn.on = utils.makeArgsTry(_add);
                    _$.fn.off = function () {
                        var args = [];
                        utils.toArray(arguments).forEach(function (v) {
                            utils.isFunction(v) && v.tryWrap && (v = v.tryWrap);
                            args.push(v);
                        });
                        return _remove.apply(this, args);
                    };
                } else if (_$.fn.jquery) {
                    _add = _$.event.add, _remove = _$.event.remove;

                    _$.event.add = utils.makeArgsTry(_add);
                    _$.event.remove = function () {
                        var args = [];
                        utils.toArray(_arguments).forEach(function (v) {
                            utils.typeDecide(v, 'Function') && v.tryWrap && (v = v.tryWrap);
                            args.push(v);
                        });
                        return _remove.apply(_this3, args);
                    };
                }

                var _ajax = _$.ajax;

                if (_ajax) {
                    _$.ajax = function (url, setting) {
                        if (!setting) {
                            setting = url;
                            url = undefined;
                        }
                        utils.makeObjTry(setting);
                        if (url) return _ajax.call(_$, url, setting);
                        return _ajax.call(_$, setting);
                    };
                }
                return this;
            }
        }, {
            key: 'reportConsole',
            value: function reportConsole(func, type, level, args) {
                var _this4 = this;

                this.on('beforeReport', function () {
                    //启用console，强制merge
                    _this4.config.mergeReport = true;
                });
                var msg = args.join(',');
                var typeList = this.consoleList[type];
                typeList = typeList || [];
                typeList.push(utils.assignObject(utils.getSystemParams(), {
                    msg: msg,
                    level: level
                }));
                if (typeList.length > 10) {
                    this.errorQueue = this.errorQueue.concat(typeList);
                    this.send(true, function () {
                        typeList = [];
                    });
                }
                return func.apply(this, args);
            }
            // 劫持seajs

        }, {
            key: 'proxyModules',
            value: function proxyModules() {
                var _require = window.require,
                    _define = window.define;
                if (_define && _define.amd && _require) {
                    window.require = utils.catArgs(_require);
                    utils.assignObject(window.require, _require);

                    window.define = utils.catArgs(_define);
                    utils.assignObject(window.define, _define);
                }

                if (window.seajs && _define) {
                    window.define = function () {
                        var _arguments2 = arguments;

                        var arg,
                            args = [];
                        utils.toArray(arguments).forEach(function (v, i) {
                            if (utils.isFunction(v)) {
                                v = utils.cat(v);
                                v.toString = function (orgArg) {
                                    return function () {
                                        return orgArg.toString();
                                    };
                                }(_arguments2[i]);
                            }
                            args.push(arg);
                        });
                        return _define.apply(this, args);
                    };

                    window.seajs.use = utils.catArgs(window.seajs.use);

                    utils.assignObject(window.define, _define);
                }
                return this;
            }
            // 劫持自定义方法

        }, {
            key: 'proxyCustom',
            value: function proxyCustom() {
                var _this5 = this;

                this.config.proxyCustom.forEach(function (v) {
                    if (utils.isFunction(v)) {
                        return function () {
                            utils.toArray(arguments).forEach(function (f) {
                                if (utils.isFunction(f)) {
                                    utils.cat(f);
                                } else {
                                    utils.makeObjTry(f);
                                }
                            });
                        };
                    } else {
                        _this5.error({
                            msg: '自定义方法类型必须为function',
                            level: 4
                        });
                    }
                });
                return this;
            }
        }]);
        return _class;
    }(supperclass);
};

/**
 * @author  zdongh2016
 * @fileoverview GER
 * @date 2017/02/15
 */
//import 'babel-polyfill';
// utils.fixedObjDefined();

var GER = function (_events) {
    inherits(GER, _events);

    function GER(options) {
        classCallCheck(this, GER);

        var _this = possibleConstructorReturn(this, (GER.__proto__ || Object.getPrototypeOf(GER)).call(this, options));

        _this.rewriteError();
        return _this;
    }

    createClass(GER, [{
        key: 'rewriteError',
        value: function rewriteError() {
            var _this2 = this,
                _arguments = arguments;

            window.onerror = function (msg, url, line, col, error) {
                //有些浏览器没有col
                col = col || window.event && window.event.errorCharacter || 0;
                if (_this2.trigger('error', utils.toArray(_arguments))) {
                    return false;
                }
                var reportMsg = msg;
                if (error.stack && error) {
                    reportMsg = _this2.handleErrorStack(error);
                } else {
                    //不存stack的话，对reportMsg做下处理 
                    var ext = [];
                    var f = _arguments.callee.caller,
                        // jshint ignore:line
                    c = 3;
                    //这里只拿三层堆栈信息
                    while (f && --c > 0) {
                        ext.push(f.toString());
                        if (f === f.caller) {
                            break; //如果有环
                        }
                        f = f.caller;
                    }
                    reportMsg += '@' + ext.join(',');
                }
                if (utils.typeDecide(reportMsg, "Event")) {
                    reportMsg += reportMsg.type ? "--" + reportMsg.type + "--" + (reportMsg.target ? reportMsg.target.tagName + "::" + reportMsg.target.src : "") : "";
                }
                _this2.error({
                    msg: reportMsg,
                    rolNum: line,
                    colNum: col,
                    targetUrl: url
                });
            };
        }
        // 处理onerror返回的error.stack

    }, {
        key: 'handleErrorStack',
        value: function handleErrorStack(error) {
            var stackMsg = error.stack;
            var errorMsg = error.toString();
            if (stackMsg.indexOf(errorMsg) === -1) {
                stackMsg += '@' + errorMsg;
            }
            return stackMsg;
        }
    }]);
    return GER;
}(Events$1(Localstroage$1(Report$1(proxy(Config)))));

/**
 * @author xiaojue
 * @fileoverview mutil class inherit
 */

return GER;

})));
