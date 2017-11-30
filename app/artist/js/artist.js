$(document).ready(function(){
	$("#myTab").find("a").on("click",function(){
		var $this = $(this);
		selectTab($this);
	});
	$("button#staticMore").on("click",function(){
		var page = $("div#static").data("page");
		getStaticInfos(page);
	});
	$("button#accountMore").on("click",function(){
		var page = $("div#account").data("page");
		getAccountInfos(page);
	});
	init();
}); //document.ready End

function selectTab($this){
	if($this.attr("href") == "#static"){
		$("#static").find("tbody").html("");
		$("div#static").data("page","1");
		getStaticInfos(1);
	}else if($this.attr("href") == "#account"){
		$("#account").find("tbody").html("");
		$("div#account").data("page","1");
		getAccountInfos(1);
	}
}

function init(){
	if(urlParam("lang")!=null){
		$("#lang").val(urlParam("lang"));
	}
	if(urlParam("env")=="prd"){
		$("#env").val(urlParam("prd"));
	}
	$("#appCode").val(urlParam("appcode"));
	$("#accessToken").val(urlParam("accesstoken"));
	$("#accountBtn").on("click",function(){
		loading();
		alert("In Ready!!!");
		loading();
	});
	getNoticeInfos();
}

function getNoticeInfos(){
	loading();
	$("#accordion").html("");
	var endpoint;
	if($("#lang").val() == "ko-KR"){
		endpoint = "https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data-artist_kr.json";
	}else{
		endpoint = "https://s3-ap-northeast-1.amazonaws.com/kyaraten-notice/data-artist.json";
	}

	$.getJSON(endpoint, function(data) {
		var i = 1;
		$.each(data, function(index, value){
			title = value.title;
			issueDate = value.issueDate;
			content = value.content;

			var $template = notice_template(i);
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

function notice_template(i){
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
	if($("#env").val() == "prd"){
		apiUrl = "https://api.kyaraten.com/api/";
	}else{
		apiUrl = "http://112.216.240.202:18888/api/";
	}
	apiUrl += "v1/user/info/sales/"+page;
	loading();
	$.ajax({
		type:"get",
		url: apiUrl,
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept-Language",$("input#lang").val());
			xhr.setRequestHeader("appCode",$("#appCode").val());
			xhr.setRequestHeader("accessToken",$("#accessToken").val());
		},
		success : function (response){
			if(response.code != 0){
				alert(response.message);
				loading();
				return false;
			}
			var lastYn = response.last;
			var data = response.innerContents;
			createTable("static",data,lastYn);
			loading();
		},
		error : function(e){
			alert("error");
			console.log(e);
			loading();
		}
	});
}

function getAccountInfos(page){
	loading();
	if(page == undefined || page == null)page = 1;
	var apiUrl;
	if($("#env").val() == "prd"){
		apiUrl = "https://api.kyaraten.com/api/";
	}else{
		apiUrl = "http://112.216.240.202:18888/api/";
	}
	apiUrl += "v1/user/sales/"+page;

	$.ajax({
		type:"get",
		url: apiUrl,
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept-Language",$("input#lang").val());
			xhr.setRequestHeader("appCode",$("#appCode").val());
			xhr.setRequestHeader("accessToken",$("#accessToken").val());
		},
		success : function (response){
			if(response.code != 0){
				alert(response.message);
				loading();
				return false;
			}
			var lastYn = response.last;
			var data = response.innerContent;
			createTable("account",data,lastYn);
			loading();
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
		if(type=="static"){""
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
	}else{
		$("button.btn-block").removeClass("hide");
	}
	var page = Number($("div#"+type).data("page"));
	$("div#"+type).data("page",page+1)
}

function loading(){
	$("body").toggleClass("loading");
	$("div.mask").toggleClass("hide");
}
