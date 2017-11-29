$(document).ready(function(){
	getNoticeInfos();
	$("#accountBtn").on("click",function(){
		alert("In Ready!!!");
		loading();
	});
	$("#myTab").find("a").on("click",function(){
		var $this = $(this);
		if($this.attr("href") == "#notice"){
		}else if($this.attr("href") == "#static"){
			$("#static").find("tbody").html("");
			$("div#static").data("page","1");
			getStaticInfos(1);
		}else if($this.attr("href") == "#account"){
			$("#account").find("tbody").html("");
			$("div#account").data("page","1");
			getAccountInfos(1);
		}
	});
	$("button#staticMore").on("click",function(){
		$("div#account").data("page","1");
		var page = $("div#static").data("page");
		getStaticInfos(page);
	});

	$("button#accountMore").on("click",function(){
		var page = $("div#account").data("page");
		getAccountInfos(page);
	});
}); //document.ready End

function getNoticeInfos(){
	loading();
	$("#accordion").html("");
	//var endpoint = "https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data-artist_kr.json";
	var endpoint = "https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data-artist.json";
	$.getJSON(endpoint, function(data) {
		var i = 1;
		$.each(data, function(index, value){
			title = value.title;
			issueDate = value.issueDate;
			content = value.content;

			var $template = template(i);
			$template.find("#title").text(title);
			$template.find("#issueDate").text("["+issueDate+"]");

			$template.find("#content").html(content);
			$("#accordion").append($template);
			if(i==1){
				$template.find("div.panel-collapse").addClass("in");
			}
			i += 1;
		});
	});
	loading();
}

function template(i){
	var $template =$(
		'<div class="panel panel-default">'+
			'<div class="panel-heading">'+
				'<h4 class="panel-title">'+
					'<a id="title" class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#notice'+i+'">'+
					'</a>'+
				'</h4>'+
			'</div>'+
			'<div class="panel-collapse collapse" id="notice'+i+'">'+
				'<div class="panel-body">'+
					'<div id="issueDate" class="pull-right"></div>'+
					'<div id="content" class="col-xs-12"></div>'+
				'</div>'+
			'</div>'+
		'</div>'
	);
	return $template
}

function getStaticInfos(page){
	if(page == undefined || page == null)page = 1;
	var data = new Object();
		data.appCode = "dcbce29f-9c5c-11e7-a341-6d284b271b6d-8PnYMk";
		data.accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTm8iOjk3LCJhcHBDb2RlIjoiZGNiY2UyOWYtOWM1Yy0xMWU3LWEzNDEtNmQyODRiMjcxYjZkLThQbllNayIsImlzc3VlRGF0ZSI6MTUwNTczMDkyNDkwMn0.At3awhiO1J4uPxJJInF282UsI7k2OkAT7drlSLP3xQuQS0IJzmy42dXmjORStfkpq46Hclkk0Ilxjk9JZ1_bCw";
	loading();
	$.ajax({
		type:"get",
		url:"http://112.216.240.202:18888/api/v1/user/info/sales/"+page ,
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept-Language",$("input#lang").val());
			xhr.setRequestHeader("appCode",data.appCode);
			xhr.setRequestHeader("accessToken",data.accessToken);
		},
		success : function (response){
			loading();
			if(response.code != 0){
				alert(response.message);
				return false;
			}
			var lastYn = response.last;
			var data = response.innerContents;
			createTable("static",data,lastYn);
		},
		error : function(e){
			alert("error");
			console.log(e);
			loading();
		}

	});
}

function getAccountInfos(page){
	var data = new Object();
		data.appCode = "dcbce29f-9c5c-11e7-a341-6d284b271b6d-8PnYMk";
		data.accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTm8iOjk3LCJhcHBDb2RlIjoiZGNiY2UyOWYtOWM1Yy0xMWU3LWEzNDEtNmQyODRiMjcxYjZkLThQbllNayIsImlzc3VlRGF0ZSI6MTUwNTczMDkyNDkwMn0.At3awhiO1J4uPxJJInF282UsI7k2OkAT7drlSLP3xQuQS0IJzmy42dXmjORStfkpq46Hclkk0Ilxjk9JZ1_bCw";
	//test
	if(page == undefined || page == null)page = 1;
	loading();
	$.ajax({
		type:"get",
		url:"http://112.216.240.202:18888/api/v1/user/sales/"+page,
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept-Language",$("input#lang").val());
			xhr.setRequestHeader("appCode",data.appCode);
			xhr.setRequestHeader("accessToken",data.accessToken);
		},
		success : function (response){
			loading();
			if(response.code != 0){
				alert(response.message);
				return false;
			}
			var lastYn = response.last;
			var data = response.innerContent;
			createTable("account",data,lastYn);
		},
		error : function(e){
			alert("error");
			console.log(e);
			loading();
		}

	});
}

function createTable(type, data, lastYn){
	$.each(data, function(index, item){
		var $tr = $("<tr>");
		if(type=="static"){
			var $img = $("<img>",{"src":item.image,"width":"100px"});
			var buy = Number(item.price) * Number(item.downloadCount);
			$tr.append($("<td>").text(item.name));
			$tr.append($("<td>").append($img));
			$tr.append($("<td>").text(item.price));
			$tr.append($("<td>").text(item.viewCount));
			$tr.append($("<td>").text(item.downloadCount));
			$tr.append($("<td>").text(buy));
			$tr.append($("<td>").text(item.status));

		}else if(type=="account"){
			var issueDate = new Date(item.issueDate).format("yyyy-MM-dd");
			$tr.append($("<td>").text(issueDate));
			$tr.append($("<td>").text(item.name));
			$tr.append($("<td>").text(item.price));
			$tr.append($("<td>").text(item.ratio));
			$tr.append($("<td>").text(item.sales));
			$tr.append($("<td>").text(item.purchase));
		}
		$("#"+type).find("tbody").append($tr);
	});
	if(lastYn!="Y"){
		$("button.btn-block").addClass("hide");
	}
	var page = Number($("div#"+type).data("page"));
	$("div#"+type).data("page",page+1)
}

function loading(){
	$("body").toggleClass("loading");
	$("div.mask").toggleClass("hide");
}

/*
$(function() {
	'use strict';
	var notice = {
		env: {
			endpoint: {
				jp: 'https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data.json',
				ko: 'https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data_kr.json'
			},
			accept_language: {
				japan: 'ja',
				korea: 'ko'
			},
			accept_languages: ['ja', 'ko']
		},
		init: function(){
			this.data();
			this.cacheDom();
			this.bindEvent();
		},
		cacheDom: function(){
			this.$body = $('body');
			this.$el = $('.container');

			this.$toggleList = this.$el.find('.toggleList');
		},
		bindEvent: function(){
			notice.$toggleList.on('click', 'a', function(e){
				e.preventDefault();
				var isActive = $(this).parent().hasClass('active');
				if (isActive){
					$(this).parent().removeClass('active');
				} else {
					$(this).parent().addClass('active');
				}
			});
		},
		data: function(){
			var endpoint = notice.endpoint();
			$.getJSON(endpoint, function(data) {
				$.each(data, function(index, value){
					var $template = notice.template();
					$template.find('.title').text(value.title)
					$template.find('time').text(value.issueDate);
					$template.find('article').html(value.content);
					notice.$toggleList.append($template);
				});
			});
		},
		endpoint: function(){
			var lang = url('?lang');
			if(!(lang && notice.env.accept_languages.indexOf(lang) >= 0)) lang = undefined;
			var country = lang || navigator.language || navigator.userLanguage;
			switch (country) {
				case notice.env.accept_language.japan:
					return notice.env.endpoint.jp;
				case notice.env.accept_language.korea:
					return notice.env.endpoint.ko;
				default:
					return notice.env.endpoint.jp;
			}
		},
		template: function(){
			var $section = $('<section>' +
				'<a href="#">' +
				'<div class="titleWrapper">' +
				'<div class="title"></div>' +
				'<time></time>' +
				'</div>' +
				'</a>' +
				'<article></article>' +
				'</section>');
			return $section;
		}
	}
	notice.init();
});
*/
