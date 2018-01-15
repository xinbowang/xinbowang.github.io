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
/***/ (function(module, exports) {

	"use strict";

	$(function () {
		/*
	 动态添加属性：判断插件类型
	 	其它： 0
	 	影音： 1
	 	编辑器: 2
	 	图谱： 3
	 	bootstrap组件： 4
	 	 
	 */

		// 设置sessionStorage
		var setSession = function setSession(name, value) {
			sessionStorage.setItem(name, JSON.stringify(value));
		};
		// 获取sessionStorage
		var getSession = function getSession(name) {
			return JSON.parse(sessionStorage.getItem(name));
		};
		// 初始化type类型
		var init = {
			"video": {
				"type": 1,
				"name": "影音"
			},
			"note": {
				"type": 2,
				"name": "编辑器"
			},
			"chart": {
				"type": 3,
				"name": "图谱"
			},
			"frames": {
				"type": 4,
				"name": "组件"
			},
			"other": {
				"type": 0,
				"name": "其它"
			}
			/*$.getJSON('./assets/plugins.json', (data) => {
	  	if(!data) {
	  		str = '还没有添加数据';
	  	} else {
	  		setSession('plugins', data);
	  		str = content(data);
	  	}
	  	$('.my-container').html(str);
	  })*/
			// 遍历返回数据
		};function content(data) {
			var str = '<div class="container" style="padding: 10px 0 30px">';
			data.map(function (ele, i) {
				str += "<div class=\"col-lg-4 col-md-3 col-sm-4\">\n\t\t\t\t\t\t<div class=\"my-plugins\">\n\t\t\t\t\t\t\t<div class=\"my-images my-" + ele.type + "\"><a class=\"hrefIframe\" href=\"#" + ele.src + "\"><img src=\"" + ele.img + "\"></a></div>\n\t\t\t\t\t\t\t<div class=\"my-introduce\">\n\t\t\t\t\t\t\t\t<p class=\"my-title\">\n\t\t\t\t\t\t\t\t\t<a class=\"hrefIframe\" href=\"#" + ele.src + "\">" + ele.name + "</a>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<p class=\"my-info\">" + ele.info + "</p>\n\t\t\t\t\t\t\t\t<p class=\"my-classification\">\n\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-list\"></i>\n\t\t\t\t\t\t\t\t\t" + ele.typeName + "\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";
			});
			return str + '</div>';
		}
		// 创建导航
		createNav();
		function createNav() {
			for (var i in init) {
				var nav = $("<li id=\"" + i + "\"><a href=\"#" + i + "\">" + init[i].name + "</a></li>");
				$('.my-nav').append(nav);
			}
		}
		// 导航点击关闭事件
		var win = 0;
		function wins() {
			win = $(window).width();
			if (win < 768) {
				$('.my-nav').on('click', 'li', function (event) {
					hides();
				});
				$('.my-index').click(function () {
					hides();
				});
			}
		}
		wins();
		$(window).resize(function () {
			wins();
		});
		function hides() {
			$('#bs-example-navbar-collapse-1').removeClass('in').attr('aria-expanded', false).css('height', 1);
		}

		// 给导航添加属性
		/*$('.my-nav li').map((i, ele) => {
	 	var type = $(ele).find('a').attr('href').substr(1);
	 	$(ele).attr({'id': type, 'data-type': init[type]});
	 })*/

		// 导航点击，筛选内容列表
		/*$('.my-nav li').click(function() {
	 	$(this).addClass('active').siblings().removeClass('active');
	 })*/
		// 插件库点击事件->
		$('.my-index').click(function () {
			backIndex();
			//var pluginsList = getSession('plugins');
			//if(!pluginsList.length) return false;
			//var str = content(pluginsList);
			//$('.my-container').html(str);
		});
		/*$('.my-container').on('click', '.hrefIframe', (event) => {
	 	// var href = $(this).attr('data-href');
	 	var target = event.target;
	 	var href = '';
	 	if(target.nodeName.toLowerCase() === 'img'){
	 		href = $(target).parent().attr('data-href');
	 	} else {
	 		href = $(target).attr('data-href');
	 	}
	 	// console.log(href);
	 	if(href){
	 		var $iframe = $('<iframe width="100%" src="'+ hash +'" id="iframeLoad" frameborder="0" scrolling="no" ></iframe>');
	 		$('.my-container').html('').append($iframe);
	 	}
	 })*/
		// 为单页面增加history路由操作;
		function history() {
			var str = '';
			$.history.init(function (hash) {

				if (hash) {
					var reg = /^\.|http.*\.html|.htm|.com/g; // 正则匹配hash是否为以点开始以html结尾;
					if (reg.test(hash)) {
						// 正则匹配hash是否为以点开始以html结尾;
						$.ajax({ // 验证链接是否有效;
							url: hash,
							complete: function complete(response) {
								// 无效返回首页;
								if (response.status !== 200) {
									backIndex();
								}
							}
						});

						// 创建iframe添加到my-container中;
						var $div = $('<div id="iframeLoads"><iframe width="100%" id="iframeLoad" frameborder="0" style="float: left;" scrolling="yes" ></iframe><div/>');
						$('.my-container').html('').append($div);
						$('#iframeLoad').attr('src', hash);
						var $winHeight = $(window).height();
						$('#iframeLoad, #iframeLoads').height($winHeight - $('.navbar-inverse').outerHeight());
						$('#iframeLoads').css('overflow', 'hidden');
						return; // 终止后续执行;
					}
					if (!init[hash]) {
						backIndex();
					}
					// 获取session列表
					var pluginsList = getSession('plugins');
					// 获取type类型
					var index = init[hash].type;
					// 清除导航active并添加当前
					$('#' + hash).addClass('active').siblings().removeClass('active');
					// 通过type类型筛选符合要求的列表
					if (index || parseInt(index) === 0) {
						var newList = pluginsList.filter(function (ele, i) {
							return ele.type === parseInt(index);
						});
					} else {
						backIndex();
					}
					if (newList.length) {
						str = content(newList);
					} else {
						str = '<div class="alert alert-danger" role="alert">暂无数据</div>';
					}
				} else {
					if (!getSession('plugins')) {
						// 如果没有session，发送ajax请求
						$.getJSON('./assets/plugins.json', function (data) {
							if (!data) {
								str = '<div class="alert alert-danger" role="alert">暂无数据</div>';
							} else {
								setSession('plugins', data);
								str = content(data);
							}
							$('.my-container').html(str);
							return;
						});
					} else {
						str = content(getSession('plugins'));
					}
				}
				// 将符合type要求的列表添加到my-container中;
				$('.my-container').html(str);
			});
		}
		history();
		function backIndex() {
			$.history.load(''); // 返回首页
			$('.my-nav li').removeClass('active');
			return;
		}
	});

/***/ })
/******/ ]);