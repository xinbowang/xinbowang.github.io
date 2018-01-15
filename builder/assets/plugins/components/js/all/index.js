'use strict';

var _history = require('./history.js');

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