$(function(){

    var url ='newshtml/newsAddVotes?ID=' + $(".news-votes").attr("data-id") + '&votes=' + $(".news-votes").attr("data-votes");
    $.ajax({
        url:url,
        type:'get'
    });



    var title=encodeURIComponent($(".news-title").text().substring(0,76)),
        locationUrl = encodeURIComponent(location.href),
        serverUrl=null;

    $(".news-share a").click(function(){
        if($(this).is(".sina-icon")){
            serverUrl="http://v.t.sina.com.cn/share/share.php?title="+ title +"&url=" + locationUrl;
        }

        if($(this).is(".qzone-icon")){
            serverUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary="+ title +"&url="+locationUrl;
        }

        if($(this).is(".wb-icon")){
            serverUrl="http://v.t.qq.com/share/share.php?title="+title+"&url="+locationUrl;
        }

        if($(this).is(".qq-icon")){
            serverUrl="http://connect.qq.com/widget/shareqq/index.html?title="+ title +"&url="+locationUrl;
        }

        window.open(serverUrl,"newWin","scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes");
        return false;
    })
});

