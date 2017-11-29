$(document).ready(function(){
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


Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
