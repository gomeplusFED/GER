(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.GER = factory());
}(this, (function () {

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index_min = createCommonjsModule(function (module, exports) {
/*!
 * @version 0.1.0
 * @date 2018-01-10
 */
!function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["fe-report"]=t():e["fe-report"]=t();}("undefined"!==typeof self?self:commonjsGlobal,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t);}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=n(2),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),i={dataKey:"",mergeReport:!0,delay:1e3,url:"",getPath:"",postPath:"",random:1};return n.config=a.a.assignObject(i,e),n.queue={get:[],post:[]},n.getUrl=n.config.url+n.config.getPath,n.postUrl=n.config.url+n.config.postPath,n}return i(t,e),s(t,[{key:"reportByGet",value:function(e){this.sendData("get",e);}},{key:"reportByPost",value:function(e){this.sendData("post",e);}},{key:"sendData",value:function(e,t){this.catchData(e,t)&&this.delayReport();}},{key:"delayReport",value:function(e){var t=this;if(this.trigger("beforeReport")){var n=this.config.mergeReport?this.config.delay:0;setTimeout(function(){t.trigger("beforeSend")&&t.report(e);},n);}}},{key:"catchData",value:function(e,t){return!(Math.random()>=this.config.random)&&(this.queue[e].push(t),this.queue[e])}},{key:"report",value:function(e){var t=this;Promise.all([this.getRequest(),this.postRequest()]).then(function(n){t.trigger("afterReport"),e&&e.call(t,n);});}},{key:"getRequest",value:function(){var e=this;return new Promise(function(t){if(0===e.queue.get.length)t();else{var n=e._getParames("get"),r=e.getUrl+"?"+e.config.dataKey+"="+n,o=new window.Image;o.onload=function(){t(n);},o.src=r;}})}},{key:"postRequest",value:function(){var e=this;return new Promise(function(t){if(0===e.queue.post.length)t();else{var n=e._getParames("post"),r=new XMLHttpRequest;r.onreadystatechange=function(){4==r.readyState&&200==r.status&&t(n);},r.open("POST",e.postUrl,!0),r.setRequestHeader("Content-Type","application/json");var o={};o[e.config.dataKey]=n,r.send(JSON.stringify(o));}})}},{key:"_getParames",value:function(e){var t=this.queue[e],n=this.config.mergeReport,r=n?t:[t.shift()];return n&&(this.queue[e]=[]),r.map(function(e){return a.a.serializeObj(e)}).join("|")}}]),t}(u.a);t.default=f;},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e),this.handlers={};}return o(e,[{key:"on",value:function(e,t){return this.handlers[e]=this.handlers[e]||[],this.handlers[e].push(t),this.handlers[e]}},{key:"off",value:function(e){this.handlers[e]&&delete this.handlers[e];}},{key:"trigger",value:function(e,t){var n=this,r=t||[],o=this.handlers[e];return!o||o.every(function(e){return!1!==e.apply(n,r)})}}]),e}();t.a=i;},function(e,t,n){"use strict";var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o={typeDecide:function(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"},serializeObj:function(e){var t="";return Object.keys(e).forEach(function(n){o.typeDecide(e[n],"Object")?t+=n+"="+o.stringify(e[n]):t+=n+"="+e[n]+"^";}),encodeURIComponent(t.substr(0,t.length-1))},stringify:function(e){if(window.JSON&&window.JSON.stringify)return JSON.stringify(e);var t="undefined"===typeof e?"undefined":r(e);if("object"!=t||null===e)return"string"==t&&(e='"'+e+'"'),String(e);var n,o,i=[],u=e&&e.constructor==Array,a=arguments.callee;for(n in e)e.hasOwnProperty(n)&&(o=e[n],t="undefined"===typeof o?"undefined":r(o),e.hasOwnProperty(n)&&("string"==t?o='"'+o+'"':"object"==t&&null!==o&&(o=a(o)),i.push((u?"":'"'+n+'":')+String(o))));return(u?"[":"{")+String(i)+(u?"]":"}")},assignObject:function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}};t.a=o;}])});
});

var Report = unwrapExports(index_min);

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
  isFunction: function isFunction(f) {
    return utils.typeDecide(f, 'Function');
  },
  isString: function isString(f) {
    return utils.typeDecide(f, 'String');
  },
  serializeObj: function serializeObj(obj) {
    var parames = '';
    Object.keys(obj).forEach(function (name) {
      if (utils.typeDecide(obj[name], 'Object')) {
        parames += name + '=' + utils.stringify(obj[name]);
      } else {
        parames += name + '=' + obj[name] + '^';
      }
    });
    console.log(parames);
    return encodeURIComponent(parames.substr(0, parames.length - 1));
  },
  stringify: function stringify(obj) {
    if (window.JSON && window.JSON.stringify) {
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
    return window.JSON && window.JSON.parse ? JSON.parse(str) : new Function('return ' + str)();
  },
  getServerPort: function getServerPort() {
    return window.location.port === '' ? window.location.protocol === 'http:' ? '80' : '443' : window.location.port;
  },
  getUserAgent: function getUserAgent() {
    return window.navigator.userAgent;
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
  getSystemParams: function getSystemParams(config) {
    var scr = window.screen;
    var isHybrid = config.isHybrid;
    var hybridInfo = config.hybridInfo;
    var systemparams = {
      userAgent: utils.getUserAgent(),
      currentUrl: window.location.href,
      timestamp: +new Date() + Math.random(),
      projectType: utils.getPlatType(),
      flashVer: utils.flashVer(),
      title: document.title,
      screenSize: scr.width + "x" + scr.height,
      referer: document.referer ? document.referer : '',
      host: window.location.protocol + '//' + window.location.hostname
    };
    if (isHybrid && !hybridInfo.host) {
      hybridInfo.host = 'hybrid UNKNOW host';
      this.assignObject(systemparams, hybridInfo);
    }
    return systemparams;
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
  assignObject: function assignObject(obj1, obj2) {
    for (var name in obj2) {
      if (obj2.hasOwnProperty(name)) {
        obj1[name] = obj2[name];
      }
    }
    return obj1;
  },
  getErrorInfo: function getErrorInfo(ex) {
    if (typeof ex.stack === 'undefined' || !ex.stack) {
      return {

        'msg': ex.name + ':' + ex.message,
        'level': 4
      };
    } else {
      var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
          gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
          winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,


      // Used to additionally parse URL/line/column from eval frames
      geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
          chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,
          lines = ex.stack.split('\n'),
          stack = [],
          submatch,
          parts,
          element,
          reference = /^(.*) is undefined$/.exec(ex.message);
      if (parts = chrome.exec(lines[1])) {
        var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
        var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
        if (isEval && (submatch = chromeEval.exec(parts[2]))) {
          // throw out eval line/column and use top-most line/column number
          parts[2] = submatch[1]; // url
          parts[3] = submatch[2]; // line
          parts[4] = submatch[3]; // column
        }
        element = {
          'url': !isNative ? parts[2] : null,
          'line': parts[3] ? +parts[3] : null,
          'column': parts[4] ? +parts[4] : null
        };
      } else if (parts = winjs.exec(lines[1])) {
        element = {
          'url': parts[2],
          'line': +parts[3],
          'column': parts[4] ? +parts[4] : null
        };
      } else if (parts = gecko.exec(lines[1])) {
        var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        if (isEval && (submatch = geckoEval.exec(parts[3]))) {
          // throw out eval line/column and use top-most line number
          parts[3] = submatch[1];
          parts[4] = submatch[2];
          parts[5] = null; // no column when eval
        } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
          // FireFox uses this awesome columnNumber property for its top frame
          // Also note, Firefox's column number is 0-based and everything else expects 1-based,
          // so adding 1
          // NOTE: this hack doesn't work if top-most frame is eval
          stack[0].column = ex.columnNumber + 1;
        }
        element = {
          'url': parts[3],
          'line': parts[4] ? +parts[4] : null,
          'column': parts[5] ? +parts[5] : null
        };
      }

      return {
        'msg': ex.name + ':' + ex.message,
        'rowNum': element.line,
        'colNum': element.column,
        'targetUrl': element.url,
        'level': 4
      };
    }
  }
};

/**
 * @author  zdongh2016
 * @fileoverview config
 * @date 2017/02/16
 */

var config = {
    isHybrid: false,
    hybridInfo: {
        host: 'template id' //必选，标明是什么模板
        //其他你想传的参数，最后都会merge到SystemParams上
    },
    proxyAll: false,
    mergeReport: true, // mergeReport 是否合并上报， false 关闭， true 启动（默认）
    delay: 1000, // 当 mergeReport 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
    dataKey: 'err_msg', //上报数据的属性名，用于服务器获取数据
    url: '', // 指定错误上报地址
    getPath: '/read.gif', // get请求路径
    postPath: '/post/jserr', // post请求路径
    except: [/^Script error\.?/, /^Javascript error: Script error\.? on line 0/], // 忽略某个错误
    random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
    repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
    errorLSSign: 'mx-error', // error错误数自增 0
    maxErrorCookieNo: 20, // error错误数自增 最大的错
    validTime: 7
};

var Config$1 = function Config(supperclass) {
    return function (_supperclass) {
        inherits(_class, _supperclass);

        function _class(options) {
            classCallCheck(this, _class);

            var assignConfig = utils.assignObject(config, options);

            var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, assignConfig));

            _this.config = assignConfig;
            return _this;
        }

        createClass(_class, [{
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
        return _class;
    }(supperclass);
};

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
    var oData = data ? utils.parse(data) : {};

    var date = +new Date();
    for (var key in oData) {
      if (oData[key].expiresTime <= date) {
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
  setInfo: function setInfo(key, errorObj, validTime, max) {
    var source = storage.getItem(key);
    if (errorObj) {
      var name = storage.getKey(errorObj);
      source = this.limitError(source, max);
      source[name] = {
        expiresTime: storage.getEpires(validTime),
        value: errorObj.msg
      };
    }
    return utils.stringify(source);
  },
  //设置cookie/localStorage
  setItem: InertLocalFunc(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    try {
      localStorage.setItem(args[0], callByArgs(storage.setInfo, args, storage));
    } catch (e) {}
  }, function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    utils.addCookie(args[0], callByArgs(storage.setInfo, args, storage));
  }),
  //获取cookie/localStorage
  getItem: InertLocalFunc(function (key) {
    return storage.deleteExpiresItem(localStorage.getItem(key));
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

            _this.repeatList = {};
            ['log', 'debug', 'info', 'warn', 'error'].forEach(function (type, index) {
                _this[type] = function (msg) {
                    return _this.handleMsg(msg, type, index);
                };
            });
            // 发从之前存储数据
            _this.on('beforeSend', function () {
                _this.queue.get.map(function (obj) {
                    _this.setItem(obj);
                });
                _this.queue.post.map(function (obj) {
                    _this.setItem(obj);
                });
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
            // 发送

        }, {
            key: 'send',
            value: function send(cb) {
                this.delayReport(cb);
            }
        }, {
            key: 'except',
            value: function except(error) {
                var oExcept = this.config.except;
                var result = false;
                var v = null;
                if (utils.typeDecide(oExcept, "Array")) {
                    for (var i = 0, len = oExcept.length; i < len; i++) {
                        v = oExcept[i];
                        if (utils.typeDecide(v, "RegExp") && v.test(error.msg) || utils.typeDecide(v, "Function") && v(error, error.msg)) {
                            result = true;
                            break;
                        }
                    }
                }
                return result;
            }
            // push错误到pool

        }, {
            key: 'catchError',
            value: function catchError(error, type) {
                type = type || 'get';
                this.catchData(type, error);
                return this.queue[type];
            }
            // 手动上报 

        }, {
            key: 'handleMsg',
            value: function handleMsg(msg, type, level) {
                if (!msg) {
                    return false;
                }
                if (utils.typeDecide(msg, 'Object') && !msg.msg) {
                    return false;
                }

                if (utils.typeDecide(msg, 'Error')) {
                    msg = {
                        msg: msg.message,
                        ext: {
                            stack: msg.stack
                        }
                    };
                }

                var errorMsg = utils.typeDecide(msg, 'Object') ? msg : {
                    msg: msg,
                    level: level
                };
                errorMsg = utils.assignObject(utils.getSystemParams(this.config), errorMsg);

                if (!this.repeat(errorMsg) && !this.except(errorMsg)) {
                    this.reportByGet(errorMsg);
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

            var _this2 = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

            _this2.consoleList = {};

            _this2.timeoutkey = null;
            _this2.proxy();
            /*window.onload = () => {
                this.proxy();
            };*/
            return _this2;
        }

        createClass(_class, [{
            key: 'proxy',
            value: function proxy() {
                var _config = this.config;
                if (_config.proxyAll) {
                    this.proxyJquery().proxyModules().proxyTimer().proxyConsole();
                } else {
                    _config.proxyJquery && this.proxyJquery();
                    _config.proxyModules && this.proxyModules();
                    _config.proxyTimer && this.proxyTimer();
                    _config.proxyConsole && this.proxyConsole();
                }
            }
        }, {
            key: 'proxyConsole',
            value: function proxyConsole() {
                var _this3 = this;

                ['log', 'debug', 'info', 'warn', 'error'].forEach(function (type, index) {
                    var _console = window.console[type];
                    window.console[type] = function () {
                        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                            params[_key] = arguments[_key];
                        }

                        _this3.reportConsole(_console, type, index, utils.toArray(params));
                    };
                });
                return this;
            }
            // 劫持原生js

        }, {
            key: 'proxyTimer',
            value: function proxyTimer() {
                window.setTimeout = this.catTimeout(setTimeout);
                window.setInterval = this.catTimeout(setInterval);
                return this;
            }
            // 劫持jquery

        }, {
            key: 'proxyJquery',
            value: function proxyJquery($) {
                var _this4 = this;

                var _$ = $ || window.$;

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
                        utils.toArray(arguments).forEach(function (v) {
                            utils.isFunction(v) && v.tryWrap && (v = v.tryWrap);
                            args.push(v);
                        });
                        return _remove.apply(this, args);
                    };
                } else if (_$.fn.jquery) {
                    _add = _$.event.add, _remove = _$.event.remove;

                    _$.event.add = this.makeArgsTry(_add);
                    _$.event.remove = function () {
                        for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            params[_key2] = arguments[_key2];
                        }

                        var args = [];

                        utils.toArray(params).forEach(function (v) {
                            utils.typeDecide(v, 'Function') && v.tryWrap && (v = v.tryWrap);
                            args.push(v);
                        });
                        return _remove.apply(_this4, args);
                    };
                }

                var _ajax = _$.ajax;

                if (_ajax) {
                    _$.ajax = function (url, setting) {
                        if (!setting) {
                            setting = url;
                            url = undefined;
                        }
                        _this4.makeObjTry(setting);
                        if (url) return _ajax.call(_$, url, setting);
                        return _ajax.call(_$, setting);
                    };
                }
                return this;
            }
        }, {
            key: 'reportConsole',
            value: function reportConsole(func, type, level, args) {
                var _this5 = this;

                this.on('beforeReport', function () {
                    //启用console，强制merge
                    _this5.config.mergeReport = true;
                });
                var msg = '';
                args.forEach(function (v) {
                    if (utils.typeDecide(v, 'string')) {
                        msg += v;
                    } else if (utils.typeDecide(v, 'array')) {
                        msg += '[' + v.join(',') + ']';
                    } else {
                        msg += utils.stringify(v);
                    }
                });
                var typeList = this.consoleList[type];
                typeList = typeList || [];
                typeList.push(utils.assignObject(utils.getSystemParams(this.config), {
                    msg: msg,
                    level: level,
                    rowNum: '',
                    colNum: '',
                    targetUrl: ''
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
                    window.require = this.catArgs(_require);
                    utils.assignObject(window.require, _require);

                    window.define = this.catArgs(_define);
                    utils.assignObject(window.define, _define);
                }
                if (window.seajs && _define) {
                    var _this = this;
                    window.define = function () {
                        var arg,
                            args = [];
                        for (var i = 0, l = arguments.length; i < l; i++) {
                            arg = arguments[i];
                            if (utils.isFunction(arg)) {
                                arg = _this.cat(arg);
                                //seajs should use toString parse dependencies , so rewrite it
                                arg.toString = function (orgArg) {
                                    return function () {
                                        return orgArg.toString();
                                    };
                                }(arguments[i]);
                            }
                            args.push(arg);
                        }
                        return _define.apply(this, args);
                    };
                    window.seajs.use = this.catArgs(window.seajs.use);

                    utils.assignObject(window.define, _define);
                }
                return this;
            }
            // 劫持自定义方法

        }, {
            key: 'proxyCustomFn',
            value: function proxyCustomFn(func) {
                return this.cat(func);
            }
        }, {
            key: 'proxyCustomObj',
            value: function proxyCustomObj(obj) {
                return this.makeObjTry(obj);
            }
        }, {
            key: 'cat',
            value: function cat(func, args) {
                var _this6 = this;

                return function () {
                    for (var _len3 = arguments.length, param = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        param[_key3] = arguments[_key3];
                    }

                    try {
                        args = args || utils.toArray(param);
                        return func.apply(_this6, args);
                    } catch (error) {
                        var err = utils.getErrorInfo(error);
                        _this6.trigger('tryError', [err]);
                        _this6.error(err);
                        if (!_this6.timeoutkey) {
                            var orgOnerror = window.onerror;
                            window.onerror = utils.noop;
                            _this6.timeoutkey = setTimeout(function () {
                                window.onerror = orgOnerror;
                                _this6.timeoutkey = null;
                            }, 50);
                        }
                        throw error;
                    }
                };
            }
        }, {
            key: 'catArgs',
            value: function catArgs(func) {
                var _this7 = this;

                return function () {
                    for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                        params[_key4] = arguments[_key4];
                    }

                    var args = [];
                    utils.toArray(params).forEach(function (v) {
                        utils.isFunction(v) && (v = _this7.cat(v));
                        args.push(v);
                    });
                    return func.apply(window, args);
                };
            }
        }, {
            key: 'catTimeout',
            value: function catTimeout(func) {
                var _this8 = this;

                return function () {
                    for (var _len5 = arguments.length, params = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                        params[_key5] = arguments[_key5];
                    }

                    var timeArgs = utils.toArray(params);
                    var cb = timeArgs[0];
                    var timeout = timeArgs[1];
                    if (utils.isString(cb)) {
                        try {
                            cb = new Function(cb);
                        } catch (err) {
                            throw err;
                        }
                    }
                    // for setTimeout(function, delay, param1, ...)
                    var args = timeArgs.splice(2);

                    cb = _this8.cat(cb, args.length && args);

                    return func(cb, timeout);
                };
            }
        }, {
            key: 'makeArgsTry',
            value: function makeArgsTry(func, self) {
                var _this = this;
                return function () {
                    //this指向 故：不能使用箭头函数   
                    var tmp,
                        args = [];
                    utils.toArray(arguments).forEach(function (v) {
                        utils.isFunction(v) && (tmp = _this.cat(v)) && (v.tryWrap = tmp) && (v = tmp);
                        args.push(v);
                    });
                    return func.apply(self || this, args);
                };
            }
        }, {
            key: 'makeObjTry',
            value: function makeObjTry(obj) {
                var key = void 0;
                var value = void 0;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        value = obj[key];
                        if (utils.isFunction(value)) {
                            obj[key] = this.cat(value);
                        }
                    }
                }
                return obj;
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
// import events from './events';
// utils.fixedObjDefined();

var GER = function (_localStorage) {
  inherits(GER, _localStorage);

  function GER(options) {
    classCallCheck(this, GER);

    var _this = possibleConstructorReturn(this, (GER.__proto__ || Object.getPrototypeOf(GER)).call(this, options));

    _this._storeClcikedDom = function (ele) {
      var target = ele.target ? ele.target : ele.srcElement;
      var info = {
        time: new Date().getTime()
      };
      if (target) {
        // 只保存存在的属性
        target.tagName && (info.tagName = target.tagName);
        target.id && (info.id = target.id);
        target.className && (info.className = target.className);
        target.name && (info.name = target.name);
        // 不存在id时，遍历父元素
        if (!target.id) {
          // 遍历三层父元素
          var i = 0,
              parent = target;
          while (i++ < 3 && parent.parentNode) {
            if (!parent.parentNode.outerHTML) break;
            parent = parent.parentNode;
            if (parent.id) break;
          }
          // 如果父元素中有id，则只保存id，保存规则为 父元素层级:id
          if (parent.id) {
            info.parentId = i + ':' + parent.id;
          } else {
            // 父元素没有id，则保存outerHTML
            var outerHTML = parent.outerHTML.replace(/>\s+</g, '><'); // 去除空白字符
            outerHTML && outerHTML.length > 200 && (outerHTML = outerHTML.slice(0, 200));
            info.outerHTML = outerHTML;
          }
        }
      }
      _this.breadcrumbs.push(info);
      _this.breadcrumbs.length > 10 && _this.breadcrumbs.shift();
    };

    _this.breadcrumbs = [];
    _this.rewriteError();
    _this.rewritePromiseError();
    _this.catchClickQueue();
    return _this;
  }

  createClass(GER, [{
    key: 'rewriteError',
    value: function rewriteError() {
      var _this2 = this,
          _arguments = arguments;

      var defaultOnerror = window.onerror || utils.noop;
      window.onerror = function (msg, url, line, col, error) {
        //有些浏览器没有col
        col = col || window.event && window.event.errorCharacter || 0;
        if (!_this2.trigger('error', [msg, url, line, col, error])) {
          return false;
        }
        var reportMsg = msg;
        if (error && error.stack) {
          reportMsg = _this2.handleErrorStack(error);
        } else {
          reportMsg = _this2._fixMsgByCaller(reportMsg, _arguments.callee.caller); // jshint ignore:line
        }
        if (utils.typeDecide(reportMsg, "Event")) {
          reportMsg += reportMsg.type ? "--" + reportMsg.type + "--" + (reportMsg.target ? reportMsg.target.tagName + "::" + reportMsg.target.src : "") : "";
        }
        if (reportMsg) {
          _this2.error({
            msg: reportMsg,
            rowNum: line,
            colNum: col,
            targetUrl: url,
            level: 4,
            breadcrumbs: JSON.stringify(_this2.breadcrumbs)
          });
        }
        defaultOnerror.call(null, msg, url, line, col, error);
      };
    }
  }, {
    key: 'rewritePromiseError',
    value: function rewritePromiseError() {
      var _this3 = this,
          _arguments2 = arguments;

      var defaultUnhandledRejection = window.onunhandledrejection || utils.noop;
      window.onunhandledrejection = function (error) {
        if (!_this3.trigger('error', utils.toArray(_arguments2))) {
          return false;
        }

        var msg = error.reason && error.reason.message || '';
        var stackObj = {};
        if (error.reason && error.reason.stack) {
          msg = _this3.handleErrorStack(error.reason);
          stackObj = _this3._parseErrorStack(error.reason.stack);
        } else {
          msg = _this3._fixMsgByCaller(msg, _arguments2.callee.caller); // jshint ignore:line
        }
        if (msg) {
          _this3.error({
            msg: msg,
            rowNum: stackObj.line || 0,
            colNum: stackObj.col || 0,
            targetUrl: stackObj.targetUrl || '',
            level: 4,
            breadcrumbs: JSON.stringify(_this3.breadcrumbs)
          });
        }
        defaultUnhandledRejection.call(null, error);
      };
    }
    //不存在stack的话，取调用栈信息

  }, {
    key: '_fixMsgByCaller',
    value: function _fixMsgByCaller(msg, caller) {
      var ext = [];
      var f = caller,
          c = 3;
      //这里只拿三层堆栈信息
      while (f && c-- > 0) {
        ext.push(f.toString());
        if (f === f.caller) {
          break; //如果有环
        }
        f = f.caller;
      }
      if (ext.length > 0) {
        msg += '@' + ext.join(',');
      }
      return msg;
    }
    // 从报错信息中获取行号、列号、url

  }, {
    key: '_parseErrorStack',
    value: function _parseErrorStack(stack) {
      var stackObj = {};
      try {
        // 只取第一个堆栈信息，获取包含url、line、col的部分，如果有括号，去除最后的括号
        var stackArr = stack.split('at');
        var info = stackArr[1].match(/http.*/)[0].replace(/\)$/, '');
        // 以冒号拆分
        var errorInfoArr = info.split(':');
        var len = errorInfoArr.length;
        // 行号、列号在最后位置
        stackObj.col = errorInfoArr[len - 1];
        stackObj.line = errorInfoArr[len - 2];
        // 删除最后两个（行号、列号）
        errorInfoArr.splice(len - 2, 2);
        stackObj.targetUrl = errorInfoArr.join(':');
      } catch (e) {
        stackObj = {
          col: 0,
          line: 0,
          targetUrl: ''
        };
      }
      return stackObj;
    }
    // 处理onerror返回的error.stack

  }, {
    key: 'handleErrorStack',
    value: function handleErrorStack(error) {
      var stackMsg = error.stack;
      var errorMsg = error.toString();
      if (errorMsg) {
        if (stackMsg.indexOf(errorMsg) === -1) {
          stackMsg += '@' + errorMsg;
        }
      } else {
        stackMsg = '';
      }
      return stackMsg;
    }
  }, {
    key: 'catchClickQueue',
    value: function catchClickQueue() {
      if (window.addEventListener) {
        if ('ontouchstart' in document.documentElement) {
          window.addEventListener('touchstart', this._storeClcikedDom, !0);
        } else {
          window.addEventListener('click', this._storeClcikedDom, !0);
        }
      } else {
        document.attachEvent("onclick", this._storeClcikedDom);
      }
    }
  }]);
  return GER;
}(Localstroage$1(Report$1(proxy(Config$1(Report)))));

/**
 * @author xiaojue
 * @fileoverview mutil class inherit
 */

return GER;

})));
