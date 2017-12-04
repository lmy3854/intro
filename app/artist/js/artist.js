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
	$("img#mainImg").attr("src",mainImg);
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
	setHtmlLang();
}

function getNoticeInfos(){
	loading();
	$("#accordion").html("");
	var endpoint = notice_json;

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
	var apiUrl = api_url + "/api/v1/user/info/sales/"+page;
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
			alert(e.responseJSON.message+"[code:"+e.responseJSON.code+"]");
			location.reload();
		}
	});
}

function getAccountInfos(page){
	loading();
	if(page == undefined || page == null)page = 1;
	var apiUrl = api_url + "/api/v1/user/sales/"+page;
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
			alert(e.responseJSON.message+"[code:"+e.responseJSON.code+"]");
			location.reload();
		}

	});
}

function createTable(type, data, lastYn){
	if(data.length == 0){
		var $tr = $("<tr>")
		var $td = $("<td>",{"colspan":"10"}).text(lang_data.no_data);
		$tr.append($td);
		$("#"+type).find("tbody").append($tr);
	}else{
		$.each(data, function(index, item){
			var $tr = $("<tr>");
			if(type=="static"){
				var $img = $("<img>",{"src":item.image,"class":"col-xs-12 no-padding"});
				var $price = $("<p>",{"class":"coin no-margin"}).text(item.price);
				var $buy = $("<p>",{"class":"coin no-margin"}).text(Number(item.price) * Number(item.downloadCount));
				var name = item.name;
				if(name.length > 20){
					name = name.substring(0,20) + "...";
				}
				$tr.append($("<td>",{"class":"align-middle nowrap"}).text(name));
				$tr.append($("<td>",{"class":"align-middle"}).append($img));
				$tr.append($("<td>",{"class":"align-right align-middle nowrap"}).append($price));
				$tr.append($("<td>",{"class":"align-right align-middle"}).text(item.viewCount));
				$tr.append($("<td>",{"class":"align-right align-middle"}).text(item.downloadCount));
				/*$tr.append($("<td>",{"class":"align-right align-middle nowrap"}).append($buy));*/
				//$tr.append($("<td>",{"class":"align-middle"}).text(item.status));
			}else if(type=="account"){
				var issueDate = new Date(item.issueDate).format("yyyy-MM-dd");
				var $price = $("<p>",{"class":"coin no-margin"}).text(item.price);
				var $sales = $("<p>",{"class":"coin no-margin"}).text(item.sales);
				var ration = (item.ratio * 100)+" %";
				var name = item.name;
				if(name.length > 20){
					name = name.substring(0,20) + "...";
				}
				$tr.append($("<td>",{"class":"align-middle nowrap"}).text(issueDate));
				$tr.append($("<td>",{"class":"align-middle nowrap"}).text(name));
				$tr.append($("<td>",{"class":"align-right align-middle nowrap"}).append($price));
				$tr.append($("<td>",{"class":"align-right align-middle"}).text(ration));
				$tr.append($("<td>",{"class":"align-right align-middle nowrap"}).append($sales));
				//$tr.append($("<td>",{"class":"align-middle"}).text(item.purchase));
			}
			$("#"+type).find("tbody").append($tr);
		});
	}
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

function setHtmlLang(){
	$("a#tab_1").text(lang_data.tab_1);
	$("a#tab_2").text(lang_data.tab_2);
	$("a#tab_3").text(lang_data.tab_3);

	$("th#th_static_1").text(lang_data.th_static_1);
	$("th#th_static_2").text(lang_data.th_static_2);
	$("th#th_static_3").text(lang_data.th_static_3);
	$("th#th_static_4").text(lang_data.th_static_4);
	$("th#th_static_5").text(lang_data.th_static_5);
	/*$("th#th_static_6").text(lang_data.th_static_6);
	$("th#th_static_7").text(lang_data.th_static_7);*/
	$("button#staticMore").text(lang_data.page_more);

	$("th#th_account_1").text(lang_data.th_account_1);
	$("th#th_account_2").text(lang_data.th_account_2);
	$("th#th_account_3").text(lang_data.th_account_3);
	$("th#th_account_4").text(lang_data.th_account_4);
	$("th#th_account_5").text(lang_data.th_account_5);
	/*$("th#th_account_6").text(lang_data.th_account_6);*/
	$("button#accountMore").text(lang_data.page_more);

	$("a#accountBtn").text(lang_data.account_button);
}
