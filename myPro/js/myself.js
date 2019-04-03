// 获取地址栏信息分段查询用户的id值
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
                    <li class="dnone"><a href="http://172.242.3.181:7777/myself.html">${data[1].smtext}</a> 
                    </li>
                    <li><a href="javascript:;" class="Reward">${data[3].smtext}</a></li> 
                    <li><a href="http://172.242.3.181:7777/liuyan.html?user?${num}" title="Message Board">${data[4].smtext}</a></li>
                    <li class="dnone"><a href="http://172.242.3.181:7777/Fchain.html" title="Friend chain">${data[5].smtext}</a>

                    </li>
                    <li><a href="http://172.242.3.181:8080/#/reg" title="Honeybee registration is welcomed">${data[6].smtext}</a> </li>
                </ul>
                `)
                $('.mfLogo').click(function(){
                    if(num=="undefined"){
                            window.location.href=`http://172.242.3.181:7777/index.html`;
                    }else{
                         window.location.href=`http://172.242.3.181:7777/index.html?${num}`;
                    }
                           
                })     
        }
    });
  });
  /***********************************************************************右下角标签的样式**********************************************************************/ 

/***********************************************************************Root链接&展示时**********************************************************************/ 
// 简介界面的架构
$(function(){
     $.ajax({ 
    type: "GET",         
    data:"minid=1",
    dataType: "JSON", 
    async: true, 
    url: "http://172.242.3.181:7777/myPro/qz_mine",
    success: function(result){
        $("#box>.inner").html(`
        <ul>
                        <li><a href="#"><img src="${result[0].imgOne}" alt=""></a></li>
                        <li><a href="#"><img src="${result[0].imgTwo}" alt=""></a></li>
                        <li><a href="#"><img src="${result[0].imgThree}" alt=""></a></li>
                        <li><a href="#"><img src="${result[0].imgFour}" alt=""></a></li>
                        <li><a href="#"><img src="${result[0].imgFire}" alt=""></a></li>
        </ul>
        <ol class="bar">
        </ol>
        <!--左右焦点-->
        <div id="arr">
            <span id="left">&lt;</span>
            <span id="right">&gt;</span>
        </div>
        </div>
        `)
            $(".leftB").html(`
                ${result[0].leftOne}
            `)
            $(".mB-right>.rightP").html(`       
                    ${result[0].rightOne}                    
                    ${result[0].rightTwo}                    
            `)
            /**
             *
             * @param id  传入元素的id
             * @returns {HTMLElement | null}  返回标签对象，方便获取元素
             */
            function my$(id) {
                return document.getElementById(id);}
            //获取各元素，方便操作
            var box=my$("box");
            var inner=box.children[0];
            var ulObj=inner.children[0];
            var list=ulObj.children;
            var olObj=inner.children[1];
            var arr=my$("arr");
            var imgWidth=inner.offsetWidth;
            var right=my$("right");
            var pic=0;
            //根据li个数，创建小按钮
            for(var i=0;i<list.length;i++){
                var liObj=document.createElement("li");
                olObj.appendChild(liObj);
                liObj.innerText=(i+1);
                liObj.setAttribute("index",i);
                //给按钮绑定mouseover事件
                liObj.onmouseover=function () {
                    for (var j=0;j<olObj.children.length;j++){
                        olObj.children[j].removeAttribute("class");//先清除所有按钮的样式removeclass
                    }
                    this.className="current";
                    pic=this.getAttribute("index");
                    animate(ulObj,-pic*imgWidth);
                }
            }
            //设置ol中第一个li有背景颜色
            olObj.children[0].className = "current";
            //克隆一个ul中第一个li,加入到ul中的最后=====克隆
            ulObj.appendChild(ulObj.children[0].cloneNode(true));
            var timeId=setInterval(onmouseclickHandle,2000);
            //左右焦点实现点击切换图片功能
            box.onmouseover=function () {
                arr.style.display="block";
                clearInterval(timeId);
            };
            box.onmouseout=function () {
                arr.style.display="none";
                timeId=setInterval(onmouseclickHandle,2000);};/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!----css延迟------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            right.onclick=onmouseclickHandle;/*鼠标点击换页的操作*/
            function onmouseclickHandle() {
                //如果pic的值是5,恰巧是ul中li的个数-1的值,此时页面显示第六个图片,而用户会认为这是第一个图,
                //所以,如果用户再次点击按钮,用户应该看到第二个图片
                if (pic == list.length - 1) {
                    //如何从第6个图,跳转到第一个图
                    pic = 0;//先设置pic=0
                    ulObj.style.left = 0 + "px";//把ul的位置还原成开始的默认位置
                }
                pic++;//立刻设置pic加1,那么此时用户就会看到第二个图片了
                animate(ulObj, -pic * imgWidth);//pic从0的值加1之后,pic的值是1,然后ul移动出去一个图片
                //如果pic==5说明,此时显示第6个图(内容是第一张图片),第一个小按钮有颜色,
                if (pic == list.length - 1) {
                    olObj.children[olObj.children.length - 1].className = "";//第五个按钮颜色清除
                    olObj.children[0].className = "current";   //第一个按钮颜色安排上
                } else {
                    //清除所有的小按钮的背景颜色
                    for (var i = 0; i < olObj.children.length; i++) {
                        olObj.children[i].removeAttribute("class");
                    }
                    olObj.children[pic].className = "current";
                }
            }
            left.onclick=function () {
                if (pic==0){
                    pic=list.length-1;
                    ulObj.style.left=-pic*imgWidth+"px";
                } pic--;
                animate(ulObj,-pic*imgWidth);
                for (var i = 0; i < olObj.children.length; i++) {
                    olObj.children[i].removeAttribute("class"); }
                olObj.children[pic].className = "current";  //当前的pic索引对应的按钮设置颜色
            };
            //设置任意的一个元素,移动到指定的目标位置
            function animate(element, target) {
                clearInterval(element.timeId);
                //定时器的id值存储到对象的一个属性中
                element.timeId = setInterval(function () {
                    var current = element.offsetLeft; //获取元素的当前的位置,数字类型
                    var step = 10;//每次移动的距离
                    step = current < target ? step : -step;
                    //当前移动到位置
                    current += step;
                    if (Math.abs(current - target) > Math.abs(step)) {
                        element.style.left = current + "px";
                    } else {  
                        clearInterval(element.timeId);  //清理定时器
                        element.style.left = target + "px";  //直接到达目标
                    }
                }, 10);
            }
        }
     })
})
