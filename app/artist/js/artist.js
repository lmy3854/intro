$(document).ready(function(){


	$("#accountBtn").on("click",function(){
		//정산
		loading();
	});
	/*$("div.mask").on("click",function(){
	loading();
	});*/
}); //document.ready End

function loading(){
	$("body").toggleClass("loading");
	$("div.mask").toggleClass("hide");
}
