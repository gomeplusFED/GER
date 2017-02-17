(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
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

var utils = {
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
            var _ret = function () {
                var sep = '';
                return {
                    v: '{' + Object.keys(obj).map(function (k) {
                        sep = typeof obj[k] === 'number' ? '' : '"';
                        return '"' + k + '"' + ':' + sep + obj[k] + sep;
                    }).join(',') + '}'
                };
            }();

            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
    }
};

/**
 * @author suman
 * @fileoverview localStorage
 * @date 2017/02/16
 */

var LocalStorageClass = function () {
	function LocalStorageClass() {
		classCallCheck(this, LocalStorageClass);

		/*this.options = {
  	expires : 60*24*3600
  	//domain : this.config.errorLSSign
  };*/

		var date = new Date();
		date.setTime(date.getTime() + 60 * 24 * 3600);
		this.setItem('expires', date.toGMTString());
	}
	//内部函数 参数说明(key) 检查key是否存在


	createClass(LocalStorageClass, [{
		key: 'findItem',
		value: function findItem(key) {
			var bool = document.cookie.indexOf(key);
			if (bool < 0) {
				return true;
			} else {
				return false;
			}
		}

		//得到元素值 获取元素值 若不存在则返回 null

	}, {
		key: 'getItem',
		value: function getItem(key) {
			var i = this.findItem(key);
			if (!i) {
				var array = document.cookie.split(';');
				for (var j = 0; j < array.length; j++) {
					var arraySplit = array[j];
					if (arraySplit.indexOf(key) > -1) {
						var getValue = array[j].split('=');
						//将 getValue[0] trim删除两端空格
						getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
						if (getValue[0] == key) {
							return getValue[1];
						} else {
							return 'null';
						}
					}
				}
			}
		}

		//重新设置元素

	}, {
		key: 'setItem',
		value: function setItem(key, value) {
			//let i = this.findItem(key);
			document.cookie = key + '=' + value;
		}

		//清除cookie 参数一个或多一

	}, {
		key: 'clear',
		value: function clear() {
			for (var cl = 0; cl < arguments.length; cl++) {
				var date = new Date();
				date.setTime(date.getTime() - 100);
				document.cookie = arguments[cl] + "=a; expires=" + date.toGMTString();
			}
		}
	}, {
		key: 'localStorageHandle',
		value: function localStorageHandle(cb) {
			var callback = cb || function () {};
			this.localStorage = localStorage !== undefined ? localStorage : this;
			callback.call(this, this.localStorage);
		}
	}]);
	return LocalStorageClass;
}();

/**
 * @author  zdongh2016
 * @fileoverview  Peep
 * @date 2017/02/16
 */

var Peep = function (_LocalStorage) {
    inherits(Peep, _LocalStorage);

    function Peep() {
        classCallCheck(this, Peep);

        var _this = possibleConstructorReturn(this, (Peep.__proto__ || Object.getPrototypeOf(Peep)).call(this));
        //super(options);


        console.log(_this.config, 'peep');
        var that = _this;
        window.onload = function () {
            that.peep();
        };

        //判断加载完成   
        // window.onload之后再次设置定时器判断
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

        // 劫持原生js

    }, {
        key: 'peepSystem',
        value: function peepSystem() {}

        // 劫持jquery

    }, {
        key: 'peepJquery',
        value: function peepJquery() {}
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
}(LocalStorageClass);

/**
 * @author  zdongh2016
 * @fileoverview
 * @date 2017/02/16
 */

var Events = function (_Peep) {
    inherits(Events, _Peep);

    function Events() {
        classCallCheck(this, Events);

        var _this = possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this));

        console.log(JSON.stringify(_this), 'events');
        _this.handlers = {};
        return _this;
    }

    createClass(Events, [{
        key: 'on',
        value: function on(event, handler) {
            if (typeof event === "string" && typeof handler === "function") {
                this.handlers[event] = this.handlers[event] ? this.handlers[event].push(handler) : [handler];
            }
        }
    }, {
        key: 'off',
        value: function off(event) {
            if (this.handlers[event]) {
                delete this.handlers[event];
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(event, args) {
            var _this2 = this;

            if (this.handlers[event].length) {
                return this.handlers[event].every(function (v, i) {
                    var ret = _this2.handlers[event][i].apply(_this2, args);
                    return ret === false ? false : true;
                });
            }
        }
    }]);
    return Events;
}(Peep);

/**
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */
var Config = function (_Events) {
    inherits(Config, _Events);

    function Config(options) {
        classCallCheck(this, Config);

        var _this = possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).call(this));

        _this.config = {
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
        _this.config = Object.assign(_this.config, options);
        console.log(_this.config, 'super config');
        return _this;
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
        }
    }]);
    return Config;
}(Events);

/**
 * @author suman
 * @fileoverview report
 * @date 2017/02/15
 */

var Report = function (_Config) {
    inherits(Report, _Config);

    function Report(options) {
        classCallCheck(this, Report);

        var _this = possibleConstructorReturn(this, (Report.__proto__ || Object.getPrototypeOf(Report)).call(this, options));

        console.log(_this.config, 'report');
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
            var errorMsg = utils.typeDecide(msg, 'String') ? { msg: msg } : msg;
            errorMsg.level = level;
            this.carryError(errorMsg);
            this.send();
            return errorMsg;
        }
    }]);
    return Report;
}(Config);

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

        console.log(_this.config, 'core');
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
                _this2.carryError({
                    msg: reportMsg,
                    rolNum: line,
                    colNum: col,
                    targetUrl: url
                });
                _this2.send();
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
