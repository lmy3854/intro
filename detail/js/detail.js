
		$(function(){
			init();
			$("#goKyaraten, #tailMore").on("click",function(){
				var kyaratenUrl = "https://play.google.com/store/apps/details?id=net.listensoft.kyaraten";
				window.open(kyaratenUrl);
			});
		});

		function init(){
			getDetailInfo();
			$("#img_layer").height($("#img_layer").width());
		}

		function getDetailInfo(){
			loading();
			var skinNo = urlParam("k");
			//var apiUrl = "https://api.kyaraten.com/api/v1/skin/"+skinNo;
			var apiUrl = "http://112.216.240.202:18888/api/v1/skin/"+skinNo;
			$.ajax({
				type:"get",
				url: apiUrl,
				beforeSend : function(xhr){
					xhr.setRequestHeader("Accept-Language",$("input#lang").val());
					xhr.setRequestHeader("appCode","detail_webview");
					xhr.setRequestHeader("accessToken","detail_webview");
				},
				success : function (response){
					if(response.code != 0){
						loading();
						return false;
					}
					dataAppend(response.innerContent,response.comments);
				},
				error : function(e){
					console.log(e)
					alert(e.responseJSON.message+"[code:"+e.responseJSON.code+"]");
					//location.reload();
				}
			});
		}

		function dataAppend(data, tailData){
			$("#skinImg").attr("src",data.images[0].image);
			$("#likeCnt").text(data.likeCount);
			$("#tailCnt").text(data.commentCount);
			$("#downCnt").text(data.downloadCount);
			if(data.commentCount != 0){
				tailAppend(tailData);
			}
			loading();
		}

		function tailAppend(tailData){
			$.each(tailData,function(index,item){
				var issueDate = new Date(item.issueDate).format("yyyy-MM-dd");
				var $div = $("<div>");
				if(item.image == ""){
					$div.append($("<i>",{"class":"pull-left thumbicon fa fa-user btn-grey no-hover"}) );
				}else{
					$div.append($("<img>",{"class":"pull-left","src":item.image}) );
				}

				$div.append($("<a>",{"href":"javascript:void(0)"}).text(item.id));
				$div.append($("<div>",{"class":"time"}).text(issueDate));
				$div.append($("<div>").text(item.content));

				var $divLayer = $("<div>",{"class":"profile-activity clearfix"});
				$divLayer.append($div);
				var $divFeed = $("<div>",{"class":"profile-feed"});
				$divFeed.append($divLayer);

				$("#tailLayer").append($divFeed);
				if(item.type == "PREV_COMMENT"){
					$("#tailMore").removeClass("hide");
				}
			});
		}

		function loading(){
			$("body").toggleClass("loading");
			$("div.mask").toggleClass("hide");
		}
