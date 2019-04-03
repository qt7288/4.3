var h=window.location.href;
var num=h.split("?")[1];
$(function(){
    var year = '';
    var month = '';
    var time = '';
    var ym="";
    var tetle = ".calendar .tetle";
    var date = '';
    var form = ".calendar form";
    //默认显示日期 
    var stys = rili('', '', '');
    $(form).append(stys);
    //上一年
    $(".upyear").click(function() {
        var now = new Date(time);
        year = now.getFullYear(); //得到年份
        month = now.getMonth(); //得到月份
        date = now.getDate(); //得到日期 
        $(".day").remove();
        var stys = rili(year - 1, month, date);
        $(form).append(stys);
    })
    //下一年
    $(".downyear").click(function() {
        var now = new Date(time);
        year = now.getFullYear(); //得到年份
        month = now.getMonth(); //得到月份
        date = now.getDate(); //得到日期 
        $(".day").remove();
        if (Number(month) - 1 > 11) {
            month = 11;
        }
        var stys = rili(year + 1, month, date);
        $(form).append(stys);
    })
    //上一个月
    $(".upmonth").click(function() {
        var now = new Date(time);
        year = now.getFullYear(); //得到年份
        month = now.getMonth(); //得到月份
        date = now.getDate(); //得到日期 
        $(".day").remove();
        if (Number(month) - 1 < 0) {
            month = 12;
            year = Number(year) - 1
        }
        var stys = rili(year, month - 1, date);
        $(form).append(stys);
    })
    //下一个月
    $(".downmonth").click(function() {
        var now = new Date(time);
        year = now.getFullYear(); //得到年份
        month = now.getMonth(); //得到月份
        date = now.getDate(); //得到日期 
        $(".day").remove();
        var stys = rili(year, month + 1, date);
        $(form).append(stys);
    })
    //显示
    function rili(year, month, date) {
        if (year == "" || month == "" || date == "") {
            var now = new Date();
            if (year == "") year = now.getFullYear(); //得到年份
            if (month == "") month = now.getMonth(); //得到月份
            if (date == "") date = now.getDate(); //得到日期
        }
        //得到月份
        if (Number(month) + 1 > 12) {
    
            month = 1;
            year = Number(year) + 1;
        } else {
    
            month = Number(month) + 1;
        }
        var stime = year-1 + "-" + month + "-" + "1"; //得到当月开始日期
        var utime = year + "-" + (month - 1) + "-" + "1"; //得到上月开始日期
        var d = new Date(year, month, 0);
        var length = d.getDate(); //得到当月天数
        console.log(length);
        var month_1 = new Date(year, (month - 1), 0);
        var ulength = month_1.getDate(); //得到上月天数
        ym = year + "-" + (month);
        time = year + "-" + (month) + "-" + date; //得到当前日期  
        $("#timerTime").html(`<p title="${time}">Time:${time}</p>`);

         $(tetle).html(); //添加标题显示当前日期  
        var etime = year + "-" + month + "-" + length; //得到当月结束日期
        var elength = 7 - new Date(etime).getDay(); //得到当月结束日期后补充下月天数
        var w1 = new Date(stime).getDay(); //得到当月开始日期是星期X
        if (w1 < 1) {
            w1 = 7
        }
        // alert(w1)
        var sty = '';
        var ui = ulength - w1
        //补充开始周信息 2018-7-14
        for (var i = 0; i < w1; i++) {
            sty += "<label class='day ups' data-day='" + (ui + 1) + "'>"
            sty += "<input class='appointment' date-day='" + (ui + 1) + "' placeholder='我的小目标' required='true' type='text'>";
            sty += "<span>" + (ui + 1) + "</span>";
            sty += " <em></em> </label>";
            ui++
        }
        //展示本月信息
        for (var i = 0; i < length; i++) {
            sty += "<label class='day' data-day='" + (i + 1) + "'>"
            sty += "<input class='appointment' date-day='" + (i + 1) + "' placeholder='我的小目标' required='true' type='text'>";
            sty += `<span class=${(i+1)==date?'active':''}>${(i + 1)}</span>`;
            sty += " <em></em> </label>";
        }
        //补充结束周信息
        for (var i = 0; i < elength; i++) {
            sty += "<label class='day downs' data-day='" + (i + 1) + "'>"
            sty += "<input class='appointment' date-day='" + (i + 1) + "' placeholder='我的小目标' required='true' type='text'>";
            sty += "<span>" + (i + 1) + "</span>";
            sty += " <em></em> </label>";
        }
        return sty;
    }
    // 点击弹出日历
    var isT=true;
    $(".dateText img").click(function(){
        function a(){ $(".dateText img").css({"transform":"rotate(360deg)"});}
        function b(){ $(".dateText img").css({"transform":"rotate(-360deg)"})}
        if(isT){
            $(".cal").css("transform","translateX(0rem)");
            a();
            isT=false;
        }else{
            $(".cal").css("transform","translateX(23rem)");
            b();
            isT=true;
        }
    })

    // 查询
    function timer(){
            $.ajax({
                    type:"GET",
                    data:"",
                    dataType:"JSON",
                    // async: false, 
                    url: "http://172.242.3.181:7777/rootR/qz_timeThings",
                    success: function(data) {   
                        console.log(data);
                        console.log(data.data.length);
                                var a="";
                                for(var i=0;i<data.data.length;i++){
                                    a+=`
                                    <div class="timeCt" title="发言时间${data.data[i].qtimer}">Ptime◮${data.data[i].timeCt}</div>
                                    <div class="Thing" title="${data.data[i].thing}">Starget•${data.data[i].thing}</div>
                                    `  
                                }
                                $(".timeCard").html(a);
                            }
                })
    }timer()  
    var w=0;
    $("input").blur(function(){
        w++;
        console.log(w);
        // 限制每日发言次数
        if(w>=3){
            alert("给其他伙伴一个机会吧");
            $(this).val("");
            return;
        }

        var thing=$(this).val();
        var timeCt= ym +"-" + $(this).attr("date-day");
        if(thing==""){

        }else{
            // 插入兼查询
            $.ajax({
                type:"POST",
                data:{thing,timeCt},
                dataType:"JSON",
                 // async: false, 
            url: "http://172.242.3.181:7777/rootR/qz_timeThing",
            success: function(data) {   
                // console.log(data);
                // console.log(data.data.length);
                //         // $("input[type=text]").val("");
                //         var a="";
                //         for(var i=0;i<data.data.length;i++){
                //             a+=`
                //             <div class="timeCt">${data.data[i].timeCt}</div>
                //             <div class="Thing">${data.data[i].thing}</div>
                //             `  
                //         }
                //         $(".timeCard").html(a);
                        
                timer()
            }})
        }
    })
    })