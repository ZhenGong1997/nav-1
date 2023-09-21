// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
// 拿到localStorage存的值
var x = localStorage.getItem('x');
// 将得到的字符串x变成对象
var xObject = JSON.parse(x);
// 初始为预设。hashMap储存信息，解决退出界面后添加网站消失的问题
// const hashMap = xObject || [
//     {logo:"./images/github-logo.png",  logoType:'image', url:"https://www.github.com"},
//     {logo:"./images/css-tricks-logo.jpeg", logoType:'image', url:"https://www.css-tricks.com"},
//     {logo:"./images/mdn-logo.png", logoType:'image', url:"https://developer.mozilla.org"},
// ]

var hashMap = xObject || [{
  logo: "G",
  logoType: 'image',
  url: "https://www.github.com"
}, {
  logo: "C",
  logoType: 'image',
  url: "https://www.css-tricks.com"
}, {
  logo: "M",
  logoType: 'image',
  url: "https://developer.mozilla.org"
}, {
  logo: "I",
  logoType: 'image',
  url: "https://iconfont.cn"
}];
var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //正则表达式删除/开头的内容
};
// 遍历预存内容并插入lastLi之前
var render = function render() {
  // 除新增按钮，remove其他数据（防止两遍）,重写DOM树
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <div class=\"site\">\n                <div class=\"logo\">\n                    ".concat(node.logo, "\n                </div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-closefill\"></use>\n                    </svg>\n                </div>\n            </div> \n        </li>")).insertBefore($lastLi);

    // 用click事件监听点击url,替代了a标签
    $li.on('click', function () {
      window.open(node.url);
    });
    // 阻止点击close时冒泡，防止把close当做触发点击a标签
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      // 删除对应元素
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$('.addButton').on('click', function () {
  var url = window.prompt("请问要添加什么网址？");
  if (url.indexOf('https') !== 0) {
    url = 'https://' + url;
  }

  // 将添加的新对象存入hashMap
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: 'text',
    url: url
  });
  render();
});
window.onbeforeunload = function () {
  console.log('页面关闭');
  // local storage只能存字符串
  var string = JSON.stringify(hashMap);
  // localStrorage在本地设置一个值，并把string传给他
  localStorage.setItem('x', string);
};
$(document).on('keypress', function (e) {
  // 同下const key = e.key
  var key = e.key;
  for (var i = 0; i < hashMap.length; i++) {
    console.log(hashMap[i].logo.toLowerCase());
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6709bc2b.js.map