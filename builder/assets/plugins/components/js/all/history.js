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