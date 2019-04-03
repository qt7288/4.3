// Note: Time
// 注释：时间展示
/************************************************************************time***********************************************************************/ 
$(function(){
    setInterval(function(){
            var now = new Date();
            var hour =now.getHours();
            var minute =now.getMinutes();
            var second =now.getSeconds();
            // console.log(now+":"+hour+":"+minute+":"+second);
            var Percentage=parseInt(((hour*3600+minute*60+second)/86400)*100).toFixed(2)+"%";
            // console.log(Percentage);
            $(".timeBox").mouseover(function(){
                $(".song").html(`今天已经过去了${Percentage}`);
            })
            if(Percentage>50+"%"){
            }
            $(".timeBox").css("width",Percentage).attr("title",`时间已经过去了${Percentage}`);    
        },1000);
        })
        $(function(){
            $("#header-b").click(function(){
                $("#header-b>h1,#header-h>h2").css("transform","rotate(360deg)");
            })
        });