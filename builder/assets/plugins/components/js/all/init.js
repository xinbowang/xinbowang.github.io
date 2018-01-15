'use strict';

var _preCode = require('./import/preCode.js');

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