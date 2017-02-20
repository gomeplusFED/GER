(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var utils = {
    fnLazyLoad: function (b, fn1, fn2) {
        return b ? fn1 : fn2;
    }(),
    typeDecide: function typeDecide(o, type) {
        return Object.prototype.toString.call(o) === "[object " + type + "]";
    },
    serializeObj: function serializeObj(obj) {
        var parames = '';
        Object.keys(obj).forEach(function (name) {
            parames += name + '=' + obj[name] + '&';
        });
        return parames;
    },
    stringify: function stringify(obj) {
        if (JSON.stringify) {
            return JSON.stringify(obj);
        } else {
            var sep = '';
            return '{' + Object.keys(obj).map(function (k) {
                sep = typeof obj[k] === 'number' ? '' : '"';
                return '"' + k + '"' + ':' + sep + obj[k] + sep;
            }).join(',') + '}';
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
        return !!utils.getUserAgent().match(/Mobile/) ? 'Mobile' : 'PC';
    },
    getSystemParams: function getSystemParams() {
        return {
            userAgent: utils.getUserAgent(),
            currentUrl: document.location.href,
            timestamp: +new Date(),
            projectType: utils.getPlatType()
        };
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
        times.setDate(times.getDate() + days);
        document.cookie = name + "=" + value + "; expires=" + times.toGMTString();
    },
    clearCookie: function clearCookie(value) {
        utils.addCookie(value, '', -1);
    }
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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



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
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */
var Config = function () {
    function Config(options) {
        classCallCheck(this, Config);

        this.config = {
            mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
            delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
            url: "ewewe", // 指定错误上报地址
            except: [/Script error/i], // 忽略某个错误
            random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
            repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
            errorLSSign: 'mx-error', // error错误数自增 0
            maxErrorCookieNo: 50, // error错误数自增 最大的错
            tryPeep: false,
            peepSystem: false,
            peepJquery: false,
            peepConsole: true
        };
        this.config = Object.assign(this.config, options);
    }

    createClass(Config, [{
        key: "get",
        value: function get$$1(name) {
            return this.config[name];
        }
    }, {
        key: "set",
        value: function set$$1(name, value) {
            this.config[name] = value;
        }
    }]);
    return Config;
}();

/**
 * @author  zdongh2016
 * @fileoverview  Peep
 * @date 2017/02/16
 */

var Peep = function (_Config) {
    inherits(Peep, _Config);

    function Peep(options) {
        classCallCheck(this, Peep);

        var _this = possibleConstructorReturn(this, (Peep.__proto__ || Object.getPrototypeOf(Peep)).call(this, options));

        _this.timeoutkey = null;
        window.onload = function () {
            _this.peep();
        };

        return _this;
    }

    createClass(Peep, [{
        key: 'peep',
        value: function peep() {
            if (this.config.tryPeep) {
                this.config.peepSystem && this.peepSystem();
                this.config.peepJquery && this.peepJquery();
                this.config.peepConsole && this.peepConsole();
                this.config.peepModule && this.peepModule();
                this.config.peepCustom && this.peepCustom();
            }
        }
    }, {
        key: 'onThrow',
        value: function onThrow(error) {
            this.carryError(error);
        }
    }, {
        key: 'cat',
        value: function cat(func, args) {
            return function () {
                try {
                    return func.apply(this, args || arguments);
                } catch (error) {

                    this.onThrow(error);
                    if (error.stack && console && console.error) {
                        console.error("[GER]", error.stack);
                    }
                    if (!this.timeoutkey) {
                        var orgOnerror = window.onerror;
                        window.onerror = function () {};
                        this.timeoutkey = setTimeout(function () {
                            window.onerror = orgOnerror;
                            this.timeoutkey = null;
                        }, 50);
                    }
                    throw error;
                }
            };
        }
    }, {
        key: 'catArgs',
        value: function catArgs(func) {
            return function () {
                var _this2 = this;

                var args = [];
                arguments.forEach(function (v) {
                    utils.typeDecide(v, 'Function') && (v = _this2.cat(v));
                    args.push(v);
                });
                return func.apply(this, args);
            }.bind(this);
        }
    }, {
        key: 'catTimeout',
        value: function catTimeout(func) {
            return function (cb, timeout) {
                if (utils.typeDecide(cb, 'String')) {
                    try {
                        cb = new Function(cb);
                    } catch (err) {
                        throw err;
                    }
                }
                var args = [].slice.call(arguments, 2);
                cb = this.cat(cb, args.length && args);
                return func(cb, timeout);
            }.bind(this);
        }
    }, {
        key: 'makeArgsTry',
        value: function makeArgsTry(func, self) {
            return function () {
                var _this3 = this;

                var tmp = void 0,
                    args = [];
                arguments.forEach(function (v) {
                    utils.typeDecide(v, 'Function') && (tmp = _this3.cat(v)) && (v.tryWrap = tmp) && (v = tmp);

                    args.push(v);
                });
                return func.apply(self || this, args);
            }.bind(this);
        }
    }, {
        key: 'makeObjTry',
        value: function makeObjTry(obj) {
            var key = void 0;
            var value = void 0;
            var that = this;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    value = obj[key];
                    if (utils.typeDecide(value, 'Function')) {
                        obj[key] = that.cat(value);
                    }
                }
            }
            return obj;
        }

        // 劫持原生js

    }, {
        key: 'peepSystem',
        value: function peepSystem() {
            window.setTimeout = this.catTimeout(setTimeout);
            window.setInterval = this.catTimeout(setInterval);
        }

        // 劫持jquery

    }, {
        key: 'peepJquery',
        value: function peepJquery() {
            var _$ = window.$;

            if (!_$ || !_$.event) {
                return this;
            }

            var _add = void 0,
                _remove = void 0;
            if (_$.zepto) {
                _add = _$.fn.on, _remove = _$.fn.off;

                _$.fn.on = this.makeArgsTry(_add);
                _$.fn.off = function () {
                    var args = [];
                    arguments.forEach(function (v) {
                        utils.typeDecide(v, 'Function') && v.tryWrap && (v = v.tryWrap);
                        args.push(v);
                    });
                    return _remove.apply(this, args);
                };
            } else if (window.jQuery) {
                _add = _$.event.add, _remove = _$.event.remove;

                _$.event.add = this.makeArgsTry(_add);
                _$.event.remove = function () {
                    var args = [];
                    arguments.forEach(function (v) {
                        utils.typeDecide(v, 'Function') && v.tryWrap && (v = v.tryWrap);
                        args.push(v);
                    });
                    return _remove.apply(this, args);
                };
            }

            var _ajax = _$.ajax;

            if (_ajax) {
                _$.ajax = function (url, setting) {
                    if (!setting) {
                        setting = url;
                        url = undefined;
                    }
                    this.makeObjTry(setting);
                    if (url) return _ajax.call(_$, url, setting);
                    return _ajax.call(_$, setting);
                };
            }
        }

        // 劫持console

    }, {
        key: 'peepConsole',
        value: function peepConsole() {}

        // 劫持seajs

    }, {
        key: 'peepModule',
        value: function peepModule() {}

        // 劫持自定义方法

    }, {
        key: 'peepCustom',
        value: function peepCustom() {}
    }]);
    return Peep;
}(Config);

/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */
var hasLocal = !!window.localStorage;
var storage = {
	init: function init(key, errorLSSign) {
		this.data = hasLocal ? {} : utils.getCookie(key);
		//this.data = eval("({'targetUrlajscolNumnullrowNumnull':{'value':{'targetUrl':'ajs'},'exp':5},'error2':{'value':{'targetUrl':'ajs'},'exp':5})")
		/*this.data = {
  	'error1' : {
  		'value': {
  				'targetUrl':'ajs',
  				'row':'rr',
  				'line':'ll',
  				'ua':'usus'
  			},
  		'exp':14876044208965,
  		'days' :5
  	},
  	'error2' : {
  		'value': {
  				'targetUrl':'bbb',
  				'row':'frgthy',
  				'line':'rtyty',
  				'ua':'uaua'
  			},
  		'exp':1487777708143,
  		'days' :1
  	},
  	'error3' : {
  		'value': {
  				'targetUrl':'bbb',
  				'row':'frgthy',
  				'line':'rtyty',
  				'ua':'uaua'
  			},
  		'exp':34567,
  		'days' :-1
  	}
  };*/
		for (var name in this.data) {
			var exp = this.data[name].exp;
			/*console.log(+new Date() + 86400*this.data[name].days*1000);
   console.log(exp);*/
			if (+new Date() + 86400 * this.data[name].days * 1000 >= exp) {
				delete this.data[name];
				console.log('shanle');
			}
		}
		this.setItem(errorLSSign, this.data, 888);
	},

	getParam: function getParam(key, type) {
		return utils.parse(localStorage.getItem(key))[type];
	},

	setItem: function () {
		return hasLocal ? function (key, errorObj, validTime) {
			console.log('ls');
			console.log(key, errorObj, validTime);
			var expiresTime = +new Date() + 1000 * 60 * 60 * 24 * validTime;
			var errorKey = '\\targetUrl_' + errorObj.targetUrl + '_colNum_' + (errorObj.colNum || null) + '_rowNum_' + (errorObj.rowNum || null) + '\\';
			localStorage.setItem(key, utils.stringify(defineProperty({}, errorKey, {
				'value': errorObj,
				'exp': expiresTime,
				'days': validTime
			})));
			return errorObj;
		} : function (key, errorObj, validTime) {
			console.log('cookie');
			var errorKey = '\\targetUrl_' + errorObj.targetUrl + '_colNum_' + (errorObj.colNum || null) + '_rowNum_' + (errorObj.rowNum || null) + '\\';
			// value 就是传入的一个error对象
			/*
   	let json = {
   		targetUrl : 'a.js',
   		colNum : 3,
   		rowNum : 5
   	}
   	'error3' : {
   		'value': {
   				'targetUrl':'bbb',
   				'row':'frgthy',
   				'line':'rtyty',
   				'ua':'uaua'
   			},
   		'exp':34567,
   		'days' :-1
   	}
   */
			this.data[errorKey] = {
				'value': {
					'targetUrl': 'bbb',
					'row': 'frgthy',
					'line': 'rtyty',
					'ua': 'uaua'
				},
				'exp': +new Date() + 1000 * 60 * 60 * 24 * validTime,
				'days': validTime
			};
			//let res = '{{' + errorKey + ':{"value":' + utils.stringify(errorObj) + ',"exp":' + (+new Date() + 1000*60*60*24*validTime) + ',"days":' + validTime +'}}';
			utils.addCookie(key, utils.stringify(this.data), 888);
		};
	}(),

	getItem: function () {
		return hasLocal ? function (key) {
			console.log('ls');
			return localStorage.hasOwnProperty(key) ? storage.getParam(key, 'value') : '';
		} : function (key) {
			console.log('cookie');
			// 取什么数据？是否需要处理？
			return utils.getCookie(key);
		};
	}(),

	clear: function () {
		return hasLocal ? function (key) {
			console.log('ls');
			return key ? localStorage.removeItem(key) : localStorage.clear();
		} : function (key) {
			console.log('cookie');
			return key ? utils.clearCookie(key) : document.cookie.split('; ').forEach(utils.clearCookie);
		};
	}()

};

var Localstroage = function (_Peep) {
	inherits(Localstroage, _Peep);

	function Localstroage(options) {
		classCallCheck(this, Localstroage);

		var _this = possibleConstructorReturn(this, (Localstroage.__proto__ || Object.getPrototypeOf(Localstroage)).call(this, options));

		_this.init(_this.config.errorLSSign);
		return _this;
	}

	createClass(Localstroage, [{
		key: "init",
		value: function init(key) {
			return storage.init(key, this.config.errorLSSign);
		}

		//得到元素值 获取元素值 若不存在则返回''

	}, {
		key: "getItem",
		value: function getItem(key) {
			return storage.getItem(key);
		}
		// 设置一条localstorage或cookie

	}, {
		key: "setItem",
		value: function setItem(errorObj, days) {
			storage.setItem(this.config.errorLSSign, errorObj, days);
		}

		//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie

	}, {
		key: "clear",
		value: function clear(key) {
			storage.clear(key);
		}
	}]);
	return Localstroage;
}(Peep);

/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */

var Events = function (_Localstorage) {
    inherits(Events, _Localstorage);

    function Events(options) {
        classCallCheck(this, Events);

        var _this = possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this, options));

        _this.handlers = {};
        return _this;
    }

    createClass(Events, [{
        key: "on",
        value: function on(event, handler) {
            if (typeof event === "string" && typeof handler === "function") {
                this.handlers[event] = this.handlers[event] ? this.handlers[event].push(handler) : [handler];
            }
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

            if (this.handlers[event]) {
                return this.handlers[event].every(function (v, i) {
                    var ret = _this2.handlers[event][i].apply(_this2, args);
                    return ret === false ? false : true;
                });
            }
        }
    }]);
    return Events;
}(Localstroage);

/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var Report = function (_Events) {
    inherits(Report, _Events);

    function Report(options) {
        classCallCheck(this, Report);

        var _this = possibleConstructorReturn(this, (Report.__proto__ || Object.getPrototypeOf(Report)).call(this, options));

        _this.errorQueue = [];
        _this.repeatList = {};
        _this.mergeTimeout = null;
        _this.url = _this.config.url;
        _this.srcs = [];
        ['log', 'debug', 'info', 'warn', 'error'].forEach(function (type, index) {
            _this[type] = function (msg) {
                _this.handleMsg(msg, type, index);
            };
        });

        return _this;
    }

    createClass(Report, [{
        key: "repeat",
        value: function repeat(error) {
            var repeatName = error.rowNum === undefined || error.colNum === undefined ? error.msg : error.msg + error.rowNum + error.colNum;
            this.repeatList[repeatName] = this.repeatList[repeatName] === undefined ? 1 : this.repeatList[repeatName] + 1;
            //this.repeatList[repeatName] = this.repeatList[repeatName] > this.config.repeat ? this.config.repeat : this.repeatList[repeatName];
            return this.repeatList[repeatName] <= this.config.repeat;
        }
    }, {
        key: "report",
        value: function report(cb) {
            var parames = '';
            var queue = this.errorQueue;

            if (this.config.mergeReport) {
                // 合并上报
                console.log('合并上报');
                parames = queue.map(function (obj) {
                    return utils.serializeObj(obj);
                }).join('|');
            } else {
                // 不合并上报
                console.log('不合并上报');
                if (queue.length) {
                    var obj = queue[0];
                    parames = utils.serializeObj(obj);
                }
            }
            this.url += '?' + parames;
            var oImg = new Image();
            oImg.onload = function () {
                queue.forEach(function (v) {
                    localStorage.setItem('mes', utils.stringify(v)); //errorObj  to string 再存localStorage
                });
                queue = [];
                //utils.stringify({"mes" : error});  //????????????????
                if (cb) {
                    cb.call(this);
                }
                this.trigger('afterReport');
            }.bind(this);
            oImg.src = this.url;
            this.srcs.push(oImg.src);
            console.log(this.srcs);
        }
        // 发送

    }, {
        key: "send",
        value: function send(isNowReport, cb) {
            this.trigger('beforeReport');

            if (isNowReport) {
                // 延迟上报
                this.mergeTimeout = setTimeout(function () {
                    this.report(cb);
                }.bind(this), this.config.delay);
            } else {
                // 现在上报
                this.report(cb);
            }
        }
        // push错误到pool

    }, {
        key: "carryError",
        value: function carryError(error) {
            if (!error) {
                console.warn('carryError方法内 error 参数为空');
                return;
            }
            // 拿到onerror的参数 先判断重复 抽样 再放数组中

            var rnd = Math.random();
            if (rnd >= this.config.random) {
                console.warn('抽样' + rnd + '|||' + this.config.random);
                return error;
            }
            console.warn('不抽样');
            //console.log(this.repeat(error))
            this.repeat(error) && this.errorQueue.push(error);
        }

        // 手动上报 处理方法:全部立即上报 需要延迟吗?

    }, {
        key: "handleMsg",
        value: function handleMsg(msg, type, level) {
            if (!msg) {
                console.warn(type + '方法内 msg 参数为空');
                return;
            }
            var errorMsg = utils.typeDecide(msg, 'String') ? {
                msg: msg
            } : msg;
            errorMsg.level = level;
            errorMsg = Object.assign(utils.getSystemParams(), errorMsg);
            this.carryError(errorMsg);
            this.send();
            return errorMsg;
        }
    }]);
    return Report;
}(Events);

/**
 * @author  zdongh2016
 * @fileoverview GER
 * @date 2017/02/15
 */
var GER = function (_Report) {
    inherits(GER, _Report);

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
                if (_this2.trigger('error', _arguments)) {
                    return false;
                }
                var reportMsg = msg;
                if (error.stack && error) {
                    reportMsg = _this2.handleErrorStack(error);
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
                return true;
            };
        }
        // 处理onerror返回的error.stack

    }, {
        key: 'handleErrorStack',
        value: function handleErrorStack(error) {
            var stackMsg = error.stack;
            var errorMsg = error.toString();
            if (stackMsg.indexOf(errorMsg) === -1) {
                stackMsg += '@';
                stackMsg += errorMsg;
            }
            return stackMsg;
        }
    }]);
    return GER;
}(Report);

window.Ger = GER;

})));
