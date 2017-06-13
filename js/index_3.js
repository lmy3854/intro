
            $('.content1').parallax({speed : 0.3});
            $('.content2').parallax({speed : 0.3});
            $('.content2-1').parallax({speed : 0.3});
            $('.content2-2').parallax({speed : 0.3});
            $('.content2-3').parallax({speed : 0.3});
            $('.content3-1').parallax({speed : 0.3});
            $('.content3-2').parallax({speed : 0.3});
            $('.content4').parallax({speed : 0.3});
            $('.content5').parallax({speed : 0.3});

            var msg={
                 noName:"이름을 입력하세요"
                ,noMail:"메일을 입력하세요"
                ,noCharacter:"메일을 입력하세요"
                ,success:"送信完了"
                ,error:"正しく入力されていない項目があります。もう一度ご入力ください。"
            }

            $(document).ready(function(){
                $("#saveBtn").on("click",function(){
                    if($.trim($("#name").val()) == ""){
                        $("div#modalMsg").text(msg.noName);
                        $("#bs-example-modal-lg").modal("toggle");
                        return false;
                    }else if($.trim($("#mail").val()) == ""){
                        $("div#modalMsg").text(msg.noMail);
                        $("#bs-example-modal-lg").modal("toggle");
                        return false;
                    }
                    $.ajax({
                         url:"https://script.google.com/macros/s/AKfycbwow4e86Vh8Syq_1fzpct7STCHHpnFkU2etQUVhBE9wN9oqtpE/exec"
                        ,data:{name:$("#name").val()
                            , mail:$("#mail").val()
                            , gender:$("input[name='gender']:checked").val()
                            , age:$("select#age option:selected").val()
                            , location:$("select#location option:selected").val()
                            , os:$("input[name='os']:checked").val()
                            , character:$("#character").val()
                            , opinion:$("#opinion").val()
                        }
                        ,type:"POST"
                        ,success:function(e){
                            $("div#modalMsg").text(msg.success);
                            $("#bs-example-modal-lg").modal("toggle");
                        }
                        ,error:function(){
                            $("div#modalMsg").text(msg.error);
                            $("#bs-example-modal-lg").modal("toggle");
                        }
                    });
                });
            });
