$(function(){
    // 跨越底部链接数据href跳转root修改界面
    // 操作页脚文本的初始条件
    $.ajax({ 
        type: "GET",         
        data:"",
        dataType: "JSON", 
        async: true, 
        url: "http://172.242.3.181:7777/myPro/qz_foot",
        success: function(result){
            $(".sea").html(`
                <img src="img/sea.png" class="foot-img-a" alt="">
                <img src="img/sea.png" class="foot-img-b" alt="">
            `)
            $("#footer-h").html(`
                <p>${result[0].ftime}${result[0].ftext}<a href="javascript:;">${result[0].froot}</a></p> 
            `);
            $("#footer-h a").click(function(){
                var pwd=prompt("输入密码");
                // console.log(pwd);
                var error=1;
                // 声明变量
                if(pwd=="root"){
                    alert(`Highest authority验证通过\n点击2s后……进入root管理员操作界面`);
                    setTimeout(() => {
                        window.location.href=`${result[0].furl}`;
                    },2000);
                }else{
                    error++;
                    alert("Highest authority密码错误-禁止进入");
                }
            })
    
    }
    })
    })