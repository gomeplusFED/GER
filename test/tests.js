(function () {
'use strict';

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

var utils$1 = {
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
                    var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
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
            ref = utils$1.stringSplice(window.location.href, "ref", "&", "");
            if (ref !== "") {
                return encodeURIComponent(ref);
            }
        }
        return encodeURIComponent(ref);
    },
    getSystemParams: function getSystemParams() {
        var scr = window.screen;
        return {
            userAgent: utils$1.getUserAgent(),
            currentUrl: document.location.href,
            timestamp: +new Date(),
            projectType: utils$1.getPlatType(),
            flashVer: utils$1.flashVer(),
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
    addCookie: function addCookie(name, value) {
        var times = new Date();
        times.setDate(times.getDate() + 100);
        document.cookie = name + "=" + value + "; expires=" + times.toGMTString();
        return utils$1.getCookie(name);
    },
    clearCookie: function clearCookie(value) {
        utils$1.addCookie(value, '', -1);
    }
};

/**
 * @author xiaojue
 * @fileoverview utils tests
 * @date 20170215
 */

var assert = chai.assert;
var expect = chai.expect;
var utils = (function () {

    describe('lib/utils', function () {
        describe('utils typeDecide', function () {
            it('should return the Object realy type', function () {
                assert.equal(true, utils$1.typeDecide('abc', 'String'));
                assert.equal(true, utils$1.typeDecide(123, 'Number'));
                assert.equal(true, utils$1.typeDecide(function () {}, 'Function'));
                assert.equal(true, utils$1.typeDecide({
                    a: 1
                }, 'Object'));
                assert.equal(true, utils$1.typeDecide([1, 2], 'Array'));
            });
        });
        describe('utils serializeObj', function () {
            it('should return the Object to String like a=1&b=1&', function () {
                assert.equal(utils$1.serializeObj({ a: 1, b: 1 }), "a=1&b=1&");
            });
        });
        describe('utils stringify', function () {
            it('should return the Object to String', function () {
                assert.equal(utils$1.stringify({ a: 1, b: 1 }), '{"a":1,"b":1}');
                assert.equal(utils$1.stringify({ a: "1", b: "1" }), '{"a":"1","b":"1"}');
            });
        });
        describe('utils parse', function () {
            it('should return the String to Object', function () {
                expect(utils$1.parse('{"a":1,"b":1}')).to.have.all.keys('a', 'b');
                expect(utils$1.parse('{"a":1,"b":1}')).to.be.a('object');
            });
        });
        describe('utils getServerPort', function () {
            it('should return the String', function () {
                expect(utils$1.getServerPort()).to.be.a('string');
                expect(parseInt(utils$1.getServerPort(), 10)).to.be.a('number');
            });
        });
        describe('utils getUserAgent', function () {
            it('should return the String', function () {
                expect(utils$1.getUserAgent()).to.be.a('string');
            });
        });
        describe('utils getPlatType', function () {
            it('should return the String like Mobild/PC', function () {
                expect(utils$1.getPlatType()).to.be.a('string');
            });
        });
        describe('utils flashVer', function () {
            it('should return the String', function () {
                expect(utils$1.flashVer()).to.be.a('string');
            });
        });
        describe('utils getReferer', function () {
            it('should return the String', function () {
                expect(utils$1.getReferer()).to.be.a('string');
            });
        });
        describe('utils getSystemParams', function () {
            it('should return the Object', function () {
                expect(utils$1.getSystemParams()).to.be.a('object');
                expect(utils$1.getSystemParams()).to.have.any.keys('timestamp', 'referer');
            });
        });
        describe('utils toArray', function () {
            it('should return the Array', function () {
                expect(utils$1.toArray([1, 2, 3, 4])).to.be.a('array');
                expect(utils$1.toArray([1, 2, 3, 4])).to.have.length.above(3);
                expect(utils$1.toArray([1, 2, 3, 4])).to.have.length.within(0, 4);
            });
        });
        describe('utils getCookie', function () {
            it('should return the string', function () {
                document.cookie = 'testMocha=1234';
                expect(utils$1.getCookie('testMocha')).to.be.a('string');
                expect(utils$1.getCookie('testMocha')).to.have.length.above(3);
                expect(utils$1.getCookie('testMocha')).to.have.length.within(0, 4);
                assert.equal(utils$1.getCookie('testMocha'), '1234');
            });
        });
        describe('utils addCookie', function () {
            it('should return the string', function () {
                expect(utils$1.addCookie('testMocha', '5678')).to.be.a('string');
                expect(utils$1.addCookie('testMocha', '5678')).to.have.length.above(3);
                expect(utils$1.addCookie('testMocha', '5678')).to.have.length.within(0, 4);
                assert.equal(utils$1.addCookie('testMocha', '5678'), '5678');
            });
        });
        /*describe( 'utils clearCookie', () => {
            it( 'should return the string', () => {
                expect(utils.addCookie('testMocha', '5678')).to.be.a('string');
                expect(utils.addCookie('testMocha', '5678')).to.have.length.above(3);
                expect(utils.addCookie('testMocha', '5678')).to.have.length.within(0,4);
                assert.equal( utils.addCookie('testMocha', '5678'), '5678' );
            } );
        } );*/
    });
});

/**
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */
var Config = function () {
    function Config(options) {
        classCallCheck(this, Config);

        this.config = {
            mergeReport: false, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
            delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
            url: "ewewe", // 指定错误上报地址
            except: [/Script error/i], // 忽略某个错误
            random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
            repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
            errorLSSign: 'mx-error', // error错误数自增 0
            maxErrorCookieNo: 20, // error错误数自增 最大的错
            tryPeep: false,
            peepSystem: false,
            peepJquery: false,
            peepConsole: false,
            validTime: 7
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
        _this.consoleList = {};
        window.onload = function () {
            _this.peep();
        };
        _this.config.peepSystem && _this.peepSystem();
        if (_this.config.peepConsole) {
            ['log', 'debug', 'info', 'warn', 'error'].forEach(function (type, index) {
                window.console[type] = _this.peepConsole(window.console[type], type, index);
            });
        }

        return _this;
    }

    createClass(Peep, [{
        key: 'peep',
        value: function peep() {
            if (this.config.tryPeep) {
                this.config.peepJquery && this.peepJquery();
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
                utils$1.toArray(arguments).forEach(function (v) {
                    utils$1.typeDecide(v, 'Function') && (v = _this2.cat(v));
                    args.push(v);
                });
                return func.apply(this, args);
            }.bind(this);
        }
    }, {
        key: 'catTimeout',
        value: function catTimeout(func) {
            return function (cb, timeout) {
                if (utils$1.typeDecide(cb, 'String')) {
                    try {
                        cb = new Function(cb);
                    } catch (err) {
                        throw err;
                    }
                }
                var args = utils$1.toArray(arguments);
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

                utils$1.toArray(arguments).forEach(function (v) {
                    utils$1.typeDecide(v, 'Function') && (tmp = _this3.cat(v)) && (v.tryWrap = tmp) && (v = tmp);

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
                    if (utils$1.typeDecide(value, 'Function')) {
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
                    utils$1.toArray(arguments).forEach(function (v) {
                        utils$1.typeDecide(v, 'Function') && v.tryWrap && (v = v.tryWrap);
                        args.push(v);
                    });
                    return _remove.apply(this, args);
                };
            } else if (window.jQuery) {
                _add = _$.event.add, _remove = _$.event.remove;

                _$.event.add = this.makeArgsTry(_add);
                _$.event.remove = function () {
                    var args = [];
                    utils$1.toArray(arguments).forEach(function (v) {
                        utils$1.typeDecide(v, 'Function') && v.tryWrap && (v = v.tryWrap);
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
    }, {
        key: 'carryConsole',
        value: function carryConsole() {}
    }, {
        key: 'peepConsole',
        value: function peepConsole(func, type, level) {
            return function () {
                var _this4 = this;

                var mergeReport = this.config.mergeReport;
                if (!mergeReport) {
                    this.on('beforeReport', function () {
                        _this4.config.mergeReport = true;
                    });
                    this.on('afterReport', function () {
                        _this4.config.mergeReport = mergeReport;
                    });
                }
                var msg = utils$1.toArray(arguments).join(',');
                this.consoleList[type] = this.consoleList[type] !== undefined ? this.consoleList[type] : [];
                this.consoleList[type].push(Object.assign(utils$1.getSystemParams(), {
                    msg: msg,
                    level: level
                }));
                if (this.consoleList[type].length > 10) {
                    this.errorQueue = this.errorQueue.concat(this.consoleList[type]);
                    this.send(true);
                    this.consoleList[type] = [];
                }
                return func.apply(this, arguments);
            }.bind(this);
        }
        // 劫持seajs

    }, {
        key: 'peepModules',
        value: function peepModules() {
            var _require = window.require,
                _define = window.define;
            if (_define && _define.amd && _require) {
                window.require = this.catArgs(_require);
                Object.assign(window.require, _require);
                window.define = this.catArgs(_define);
                Object.assign(window.define, _define);
            }

            if (window.seajs && _define) {
                window.define = function () {
                    var _this5 = this,
                        _arguments = arguments;

                    var arg,
                        args = [];
                    utils$1.toArray(arguments).forEach(function (v, i) {
                        if (utils$1.typeDecide('v', 'Function')) {
                            v = _this5.cat(v);
                            v.toString = function (orgArg) {
                                return function () {
                                    return orgArg.toString();
                                };
                            }(_arguments[i]);
                        }
                        args.push(arg);
                    });
                    return _define.apply(this, args);
                };

                window.seajs.use = this.catArgs(window.seajs.use);

                Object.assign(window.define, _define);
            }
        }

        // 劫持自定义方法

    }, {
        key: 'peepCustom',
        value: function peepCustom() {
            var _this7 = this;

            this.config.peepCustom.forEach(function (v) {
                if (utils$1.typeDecide(v, 'Function')) {
                    return function () {
                        var _this6 = this;

                        utils$1.toArray(arguments).forEach(function (f) {
                            if (utils$1.typeDecide(f, 'Function')) {
                                _this6.cat(f);
                            } else {
                                _this6.makeObjTry(f);
                            }
                        });
                    };
                } else {
                    _this7.error({
                        msg: '自定义方法类型必须为function',
                        level: 4
                    });
                    //console.error('自定义方法类型必须为function');
                }
            });
        }
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
	//设置cookie内json的key名
	setKey: function setKey(errorObj) {
		var keyArr = [];
		errorObj.msg && keyArr.push(errorObj.msg);
		errorObj.colNum && keyArr.push(errorObj.colNum);
		errorObj.rowNum && keyArr.push(errorObj.rowNum);
		return keyArr.join('@');
	},
	//检查是否有效
	checkData: function checkData(data) {
		var oData = data === '' ? {} : utils$1.parse(data);
		var date = +new Date();
		for (var key in oData) {
			if (utils$1.parse(oData[key]).expiresTime <= date) {
				delete oData[key];
			}
		}
		return oData;
	},
	//设置失效时间
	setEpires: function setEpires(validTime) {
		return +new Date() + 1000 * 60 * 60 * 24 * validTime;
	},
	//获取cookie/localStorage内容体
	setInfo: function setInfo(key, errorObj, validTime, number) {

		var loac = storage.getItem(key);
		if (errorObj !== undefined) {
			var keys = Object.keys(loac);
			if (keys.length >= number) {
				delete loac[keys[0]];
			}
			var expiresTime = storage.setEpires(validTime);
			loac[storage.setKey(errorObj)] = utils$1.stringify({
				value: errorObj,
				expiresTime: expiresTime
			});
		}
		return utils$1.stringify(loac);
	},
	//设置cookie/localStorage
	setItem: function () {
		return hasLocal ? function (key, errorObj, validTime, number) {
			localStorage.setItem(key, storage.setInfo(key, errorObj, validTime, number));
		} : function (key, errorObj, validTime, number) {
			utils$1.addCookie(key, storage.setInfo(key, errorObj, validTime, number));
		};
	}(),
	//获取cookie/localStorage
	getItem: function () {
		return hasLocal ? function (key) {
			return storage.checkData(localStorage.getItem(key) || '');
		} : function (key) {
			return storage.checkData(utils$1.getCookie(key));
		};
	}(),
	//清除cookie/localStorage
	clear: function () {
		return hasLocal ? function (key) {
			return key ? localStorage.removeItem(key) : localStorage.clear();
		} : function (key) {
			return key ? utils$1.clearCookie(key) : document.cookie.split('; ').forEach(utils$1.clearCookie);
		};
	}()

};

var Localstroage = function (_Peep) {
	inherits(Localstroage, _Peep);

	function Localstroage(options) {
		classCallCheck(this, Localstroage);

		var _this = possibleConstructorReturn(this, (Localstroage.__proto__ || Object.getPrototypeOf(Localstroage)).call(this, options));

		_this.init();
		return _this;
	}

	//得到元素值 获取元素值 若不存在则返回''


	createClass(Localstroage, [{
		key: "getItem",
		value: function getItem(key) {
			return storage.getItem(key);
		}
		// 设置一条localstorage或cookie

	}, {
		key: "setItem",
		value: function setItem(errorObj) {
			var _config = this.config;
			storage.setItem(this.config.errorLSSign, errorObj, _config.validTime, _config.maxErrorCookieNo);
		}

		//清除ls/cookie 不传参数全部清空  传参之清当前ls/cookie

	}, {
		key: "clear",
		value: function clear(key) {
			storage.clear(key);
		}
	}, {
		key: "init",
		value: function init() {
			this.setItem();
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
                this.handlers[event] = this.handlers[event] !== undefined ? this.handlers[event] : [];
                this.handlers[event].push(handler);
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
            var _this2 = this;

            var parames = '';
            var queue = this.errorQueue;
            if (this.config.mergeReport) {
                // 合并上报
                // console.log( '合并上报' );
                parames = queue.map(function (obj) {
                    _this2.setItem(obj);
                    return utils$1.serializeObj(obj);
                }).join('|');
            } else {
                // 不合并上报
                //console.log( '不合并上报' );
                if (queue.length) {
                    var obj = queue[0];
                    this.setItem(obj);
                    parames = utils$1.serializeObj(obj);
                }
            }
            this.url += '?' + parames;
            var oImg = new Image();
            oImg.onload = function () {
                queue.forEach(function (v) {
                    localStorage.setItem('mes', utils$1.stringify(v)); //errorObj  to string 再存localStorage
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
            //console.log( this.srcs );
        }
        // 发送

    }, {
        key: "send",
        value: function send(isNowReport, cb) {
            this.trigger('beforeReport');
            var callback = arguments.length === 1 ? isNowReport : cb;
            if (isNowReport) {
                // 现在上报
                this.report(callback);
            } else {
                // 延迟上报
                this.mergeTimeout = setTimeout(function () {
                    this.report(callback);
                }.bind(this), this.config.delay);
            }
        }
        // push错误到pool

    }, {
        key: "carryError",
        value: function carryError(error) {
            if (!error) {
                //console.warn( 'carryError方法内 error 参数为空' );
                return;
            }
            // 拿到onerror的参数 先判断重复 抽样 再放数组中

            var rnd = Math.random();
            if (rnd >= this.config.random) {
                //console.warn( '抽样' + rnd + '|||' + this.config.random );
                return error;
            }
            //console.warn( '不抽样' );
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
            var errorMsg = !utils$1.typeDecide(msg, 'Object') ? {
                msg: msg
            } : msg;
            errorMsg.level = level;
            errorMsg = Object.assign(utils$1.getSystemParams(), errorMsg);
            this.carryError(errorMsg);
            this.send();
            return errorMsg;
        }
    }]);
    return Report;
}(Events);

/**
 * @author suman
 * @fileoverview report tests
 * @date 2017/02/21
 */

var assert$1 = chai.assert;
var report = (function () {

	describe('my report', function () {
		describe('report info', function () {
			it('should return the Object realy type', function () {
				assert$1.equal(true, Report.info('abc', 'String'));
			});
		});
	});
});

/**
 * @author suman
 * @fileoverview report tests
 * @date 2017/02/21
 */
/*import events from './events';
import peep from './peep';
import core from './core';
import localStorage from './localStorage';*/
utils();
report();

}());
