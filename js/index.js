		var msg={
			 emptyName:"ユーザーネームを入力してください"
			,minName:"ユーザーネームは〇文字以上入力してください"
			,emptyMail:"メールアドレスを入力してください"
			,wrongMail:"メールアドレスは半角英数字で入力してください"
			,success:"送信完了"
			,error:"正しく入力されていない項目があります。もう一度ご入力ください。"
			,ready:"準備中です"
		}

		var url={
			 instagran : "https://www.instagram.com/kyaraten_app"
			,facebook : "https://www.facebook.com/%E3%82%AD%E3%83%A3%E3%83%A9%E5%A4%A9-692949480911958"
			,ameba : "http://ameblo.jp/kyaraten/"
			,line : "https://line.me/R/ti/p/%40imc9890m"
		}

		function sendData(){
			$.ajax({
				 //url:"https://script.google.com/macros/s/AKfycbwow4e86Vh8Syq_1fzpct7STCHHpnFkU2etQUVhBE9wN9oqtpE/exec"//googledrive
				 url:"https://listensoft.slack.com/services/hooks/slackbot?token=FnYtz5bBVRS7i3D7ahE51Yq6&channel=%23fb_teaser_writer"
				,data:{name:$("#name").val()
					, mail:$("#mail").val()
				}
				,type:"POST"
				,success:function(e){
					ga("send", "event", "send", "name_mail send", "", "4");
					$("#name").val("");
					$("#mail").val("");
					$("div#modalMsg").text(msg.success);
					$("div#modalMsg").css("color","#000000");
					$("#bs-example-modal-lg").modal("toggle");
				}
				,error:function(){
					$("div#modalMsg").text(msg.error);
					$("#bs-example-modal-lg").modal("toggle");
				}
			});
		}

		function modalPop(msg){
			$("div#modalMsg").text(msg);
			$("div#modalMsg").css("color","#000000");
			$("#bs-example-modal-lg").modal("toggle");
		}
