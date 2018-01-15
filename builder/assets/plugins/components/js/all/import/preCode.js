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