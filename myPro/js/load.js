/*
    封装加载动画事件
    */ 
$(function(){
    // <img src="../img/wx/mfeng.png"></img>
    $(".loading-animation").html(`<span>蓝蜂为您服务☁持续加载中……</span>`);
    setTimeout(function(){
        siteLoading.classList.remove('active')
    },2000)
})