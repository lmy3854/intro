$(document).ready(function(){

	$("#agreeBtn").on("click",function(){
		setArtistAgree();
	});
	init();
	$.get(agreement_txt, function(data){
		var agreement = data.split("\n");
		$.each(agreement,function(n,text){
			$("#agree_content").append(text+"<br/>");
		});
	});
	/*$('.scrollable').each(function () {
		var window_h = $(window).height();
		var img_h = $("img#mainImg").height();
		var agree_h = window_h - (img_h + 70);
		var $this = $(this);
		$(this).ace_scroll({
			size : agree_h,
			//size: $this.attr('data-size') || 400,
			//styleClass: 'scroll-left scroll-margin scroll-thin scroll-dark scroll-light no-track scroll-visible'
		});
	});*/
}); //document.ready End

function init(){
	$("img#mainImg").attr("src",mainImg);
	if(urlParam("lang")!=null){
		$("#lang").val(urlParam("lang"));
	}
	if(urlParam("env")=="prd"){
		$("#env").val(urlParam("prd"));
	}
	$("#id").val(urlParam("id"));
	$("#appCode").val(urlParam("appcode"));
	$("#accessToken").val(urlParam("accesstoken"));
	setHtmlLang();
}

function loading(){
	$("body").toggleClass("loading");
	$("div.mask").toggleClass("hide");
}

function setArtistAgree(){
	var apiUrl = api_url + "/api/v1/user/artist";
	var appCode = $("#appCode").val();
	var accessToken = $("#accessToken").val();
	if(appCode == "" || accessToken == ""){
		alert(lang_data.agree_error);
		return;
	}
	loading();
	$.ajax({
		type:"post",
		url: apiUrl,
		beforeSend : function(xhr){
			xhr.setRequestHeader("Accept-Language",$("input#lang").val());
			xhr.setRequestHeader("appCode", appCode);
			xhr.setRequestHeader("accessToken", accessToken);
		},
		success : function (response){
			if(response.code != 0){
				alert(response.message);
				loading();
				return false;
			}
			alert(lang_data.agree_success);
			goWebview();
		},
		error : function(e){
			//console.log(e);
			alert(e.responseJSON.message+"[code:"+e.responseJSON.code+"]");
			location.reload();
		}
	});
}

function goWebview(){
	var url = "index.html";
		url += "?id="+$("#id").val();
		url += "&appcode="+$("#appCode").val();
		url += "&accesstoken="+$("#accessToken").val();
		url += "&env="+$("#env").val();
		url += "&lang="+$("#lang").val();
	location.href = url;
}

function setHtmlLang(){
	$("a#agreeBtn").text(lang_data.agree_button);
}
