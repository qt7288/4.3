var h=window.location.href;
// 声明变量接收地址栏
// 控制台输出地址栏信息
var num=h.split("?")[1];
// 控制台输出地址栏截取的用户id
/**********************************************************************蜂窝主体文字**********************************************************************/ 
$(function(){
    $.ajax({ 
        type: "GET",         
        data: "hid=3",
        dataType: "JSON", 
        async: true, 
        url: "http://172.242.3.181:7777/myPro/qz_iht",
        success: function(data) {
            $('#header-b').html(`<h1>${data[0].btext}</h1><h2>${data[0].mtext}<h2>`)
        }
    });
  });
  /***********************************************************************头标签html**********************************************************************/ 
//   header-nav [头栏导航]
$(function(){
    $.ajax({ 
        type: "GET",         
        data: "",
        dataType: "JSON", 
        async: true, 
        url: "http://172.242.3.181:7777/myPro/qz_bq",
        success: function(data) {
                $("#header-h").html(`
                <ul>
                <img src="http://taotao2019.applinzi.com/img/mfeng.png" class="mfLogo" title="蓝蜂☁为您服务">
                    <li title="home"><a href="http://172.242.3.181:7777/index.html?${num}">${data[0].smtext}</a></li>
                    <li class="dnone"><a href="http://172.242.3.181:7777/myself.html?${num}">${data[1].smtext}</a> 
                    </li>
                    <li><a href="javascript:;" class="Reward">${data[3].smtext}</a></li> 
                    <li><a href="http://172.242.3.181:7777/liuyan.html?user?${num}" title="Message Board">${data[4].smtext}</a></li>
                    <li class="dnone"><a href="http://172.242.3.181:7777/Fchain.html?${num}">${data[5].smtext}</a>

                    </li>
                    <li><a href="http://172.242.3.181:8080/#/reg" title="Honeybee registration is welcomed">${data[6].smtext}</a> </li>
                </ul>
                `)
                $('.mfLogo').click(function(){
                            window.location.href=`http://172.242.3.181:7777/index.html?${num}`;
                })     
        }
    });
  });

/***********************************************************************Root链接&展示时**********************************************************************/ 
// 获取链接分享的位置
$(function(){
    $.ajax({ 
        type: "GET",         
        data:"",
        dataType: "JSON", 
        async: true, 
        url: "http://172.242.3.181:7777/myPro/qz_Fchain",
        success: function(result){
            $(".share").html(`
                        <p>链接分享</p>
                        <p>用知识改变命运</p>
            `)
            var Fchain="";
            for(var i=0;i<result.length;i++){
               Fchain+=`
                <li><a href="${result[i].Fhref}" target="_blank">${result[i].Fname}</a></li>
            `;
            }
            $(".shareU-ul").html(Fchain);
            }
        })

})