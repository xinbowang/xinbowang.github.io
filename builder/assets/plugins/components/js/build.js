/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = history;
	// 为单页面增加history路由操作;
	function history() {
		var arr = ['Forms', 'Buttons', 'Tables', 'Navs', 'Pages', 'Ancillaries'];
		$.history.init(function (hash) {
			if (hash) {
				// hash错误处理
				var newArr = arr.filter(function (ele, i) {
					return hash === ele;
				});
				if (!newArr.length) {
					$.history.load('');
				};
			}
			if (!hash) {
				// $.history.load('Forms'); // 返回Froms页
				$('.Forms').show(0).siblings().hide(0);
				$('#Forms').parent('li').addClass('active').siblings().removeClass('active');
				return;
			};

			$('.' + hash).show(0).siblings().hide(0);
			$('#' + hash).parent('li').addClass('active').siblings().removeClass('active');
		});
	};
	/*
	$(function() {
		history();
	});*/

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _history = __webpack_require__(1);

	var _history2 = _interopRequireDefault(_history);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
		// 自定义样式初始化
		var navJson = {
			forms: '.form-control{ /*修改表单样式*/ \n    background-color:#fff; /*修改背景色*/\n    border-radius: 4px; /*修改圆角*/\n    box-shadow:inset 0 1px 1px rgba(0,0,0,.075); /* 修改阴影*/\n    color: #333; /*字体颜色*/\n    border: 1px solid #ccc; /*边框颜色*/\n    /* 其他样式*/}\n.form-control:focus{ /*获取焦点样式*/\n    box-shadow:0 1px 1px #66afe9; /*边框阴影颜色*/\n    border: 1px solid #66afe9; /*边框颜色*/\n    /* 其他样式*/}',
			buttons: '.btn-default{ /*修改按钮样式*/ \n    background-color:#fff; /*修改背景色*/\n    border-radius: 4px; /*修改圆角*/\n    color: #333; /*字体颜色*/\n    border: 1px solid #ccc; /*边框颜色*/\n    /* 其他样式*/}'
		};
		(0, _history2.default)();
		var On = false; // 查看代码-开关按钮
		var OnChange = false; // 修改样式-开关按钮
		var hashs = $(window).get(0).location.hash || '#Forms';
		// 给样式框添加文本
		if (hashs.substr(1).length) {
			var hashlower = hashs.substr(1).toLowerCase();
			var textareaText = navJson[hashlower] || '';
			$('#my-control').html(textareaText);
		} else {
			$('#my-control').html(navJson.forms);
		}
		window.addEventListener('hashchange', function () {
			hashs = $(window).get(0).location.hash;
			OnChange = false;
			$('.my-change-style').hide(0);
			$('.my-change').html('自定义样式');
			backCode();
		}, false);
		// 查看代码
		$('.my-check').click(function (ev) {
			var _this = $(ev.target);
			var $html = _this.parent('h4').siblings('.my-base').find('.my-html');
			var $code = $html.siblings('.my-code');
			if (On) {
				_this.html('查看代码');
				$html.show(0);
				$code.hide(0);
				On = false;
			} else {
				var strHtml = $html.html();
				$html.hide(0);
				_this.html('返回视图');
				$code.show(0);
				On = true;
			}
		});
		// 复制代码
		$('.my-clone').click(function (ev) {
			var _this = $(ev.target);
			var $html = _this.parent('.my-code').siblings();
			$('.my-text').val($html.html());
			$('.my-text').select(); // 选中文本
			document.execCommand("Copy"); // 执行浏览器复制命令
			$('#myModalLabel').html('复制成功！');
			$('#myModal').modal('show');
			var timer = setTimeout(function () {
				$('#myModal').modal('hide');
				clearTimeout(timer);
			}, 2000);
		});

		// 显示样式代码编辑框
		$('.my-change').click(function (ev) {
			var _this = $(ev.target);
			if (!OnChange) {
				$('.my-change-style textarea').val($('#my-control').html());
				$('.my-change-style').show(0);
				_this.html('隐藏修改');
				OnChange = true;
			} else {
				$('#my-Modal').modal('show');
			}
		});
		// 确认不报存修改样式
		$('.my-change-sure').click(function () {
			backCode();
			$('#my-Modal').modal('hide');
			$('.my-change-style').hide(0);
			$('.my-change').html('自定义样式');
			OnChange = false;
		});
		// 运行样式代码
		$('.my-run-code').click(function () {
			var value = $('.' + hashs.substr(1) + ' .my-change-style textarea').val();
			$('#my-control').html(value);
		});
		// 复位样式
		$('.my-back-code').click(function () {
			backCode();
		});
		// 复位样式方法
		function backCode() {
			var textareas = navJson[hashs.substr(1).toLowerCase()];
			$('#my-control').html(textareas);
			$('.my-change-style textarea').val(textareas);
		}
	});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _preCode = __webpack_require__(4);

	var _preCode2 = _interopRequireDefault(_preCode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
		// 初始化执行。。。
		$('.my-pre').map(function (i, ele) {
			var $html = $(ele).parent().siblings().html();
			var str = (0, _preCode2.default)($html);
			$(ele).text(str);
		});
	});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var preCode = function preCode(str) {
		var reg = /\n\s*/g;
		var json = {};
		var newStr = str.replace(reg, function ($1, $2) {
			if (!json.len) {
				json.len = $1.length;
			};
			var num = $1.length - json.len < 0 ? 0 : $1.length - json.len;
			var arr = new Array(num);
			var str1 = arr.join(' ');
			return $1 = '\n' + str1;
		});
		return newStr;
	};
	exports.default = preCode;

/***/ })
/******/ ]);