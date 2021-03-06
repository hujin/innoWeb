$(function(){
    var obj,count= 0,sum=6;
    $(".list-item img").live("click",function(){
        var url ='teamActivity/ActivityChild?ID=' + $(this).attr("data-id") + '&votes=' + $(this).attr("data-votes");
        $.ajax({
            url:url,
            type:'get',
            success:function(result){
                obj=result[0];
                count=0;
                $(".mask-img-content img").attr("src",obj.firstImgUrl);
                $(".mask-share .mask-date").text("发布日期:"+ new Date(obj.date).toISOString().substr(0,10));
                $(".mask-title h2").text(obj.title);
                $(".mask-summary span").text(obj.summary);
                $(".mask").removeClass("hide");
            }
        });
    })

    $(".mask .mask-close").click(function(){
        $(".mask").addClass("hide");
    });

    $(".mask-prev-icon").click(function(){
       var imgObj=obj.imgChild;
       if(count>0){
           $(".mask-img-content img").attr("src",imgObj[count-1].imgUrl);
           count--;
       }

    });

    $(".mask-next-icon").click(function(){
        var imgObj=obj.imgChild;
        if(count<imgObj.length-1){
            $(".mask-img-content img").attr("src",imgObj[count+1].imgUrl);
            count++;
        }

    });

    function resizeImg(){
        if($(window).height()<=768){

            $(".mask-body").css("height","420px");
            $(".mask-img-content").css("height","420px");
            $(".mask-img-content img").css("height","420px");
            $(".mask-prev").css("top","210px");
            $(".mask-next").css("top","210px");
        }else{
            $(".mask-body").css("height",($(window).height() - 300)+"px");
            $(".mask-img-content").css("height",($(window).height() - 300)+"px");
            $(".mask-img-content img").css("height",($(window).height() - 300)+"px");
            $(".mask-prev").css("top",(($(window).height() - 300)/2) + "px");
            $(".mask-next").css("top",(($(window).height() - 300)/2) + "px");
        }
    }

    $(window).on({
        load:function(){
            resizeImg();
        },
        resize:function(){
            resizeImg();
        }
    });

    var div1 = $("#list-one"),
        div2 = $("#list-two"),
        div3 = $("#list-three"),
        div4 = $("#list-four");

    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight == scrollHeight){ //判断滚动条是否到底部
            setTimeout(loadImg, 1000);
        }
    });
    var num= 0,
        num2= 0,
        numStatus=false;
    function loadImg(){
        var url ='teamActivity/Activity?skip='+sum
        $.ajax({
            url:url,
            type:'get',
            success:function(result){
                var strhtml="";
                sum = sum + result.length;
                for(var i=0;i<result.length;i++){
                    strhtml='<div class=\'list-item\'>';
                    strhtml+='    <img src=\''+ result[i].firstImgUrl +'\' data-id=\''+ result[i].activityID +'\' data-votes=\''+ result[i].votes +'\' \>';
                    strhtml+='    <div class=\'list-item-info\'>';
                    strhtml+='        <div class=\'list-item-info-title\'>';
                    strhtml+='            <h2 title='+ result[i].title +' >'+ result[i].title +'</h2>';
                    strhtml+='        </div>';
                    strhtml+='        <div class=\'list-item-info-summary\'>';
                    strhtml+='             <span>'+ result[i].summary +'</span>';
                    strhtml+='        </div>';
                    strhtml+='        <div class=\'list-item-info-other\'>';
                    strhtml+='             <span class=\'list-item-info-date\'>'+ new Date(result[i].date).toISOString().substr(0,10) +'</span>';
                    strhtml+='             <span class=\'list-item-info-vote\'>已阅:'+ result[i].votes +'</span>';
                    strhtml+='        </div>';
                    strhtml+='    </div>';
                    strhtml+='</div>';
                    if(numStatus=true){
                        num =(i+num2) %4;
                    }else{
                        num = i%4;
                    }

                    if(num==0){
                        div1.append(strhtml);
                    }else if(num==1){
                        div2.append(strhtml);
                    }else if(num==2){
                        div3.append(strhtml);
                    }else if(num==3){
                        div4.append(strhtml);
                    }
                }
                if(num!=3){
                    numStatus=true;
                    num2=(num+1);
                }else{
                    numStatus=false
                }
            }
        });
    };

    $(".mask-share a").click(function(){
        var title=encodeURIComponent($(".mask-title h2").text().substring(0,76)),
            locationUrl = encodeURIComponent(location.href),
            picUrl =   encodeURIComponent("http://www.9tuo.com" + $(".mask-img-content img").attr("src"));
            serverUrl=null;
        if($(this).is(".sina-icon")){
            serverUrl="http://v.t.sina.com.cn/share/share.php?title="+ title +"&url=" + locationUrl + "&pic=" + picUrl;
        }

        if($(this).is(".qzone-icon")){
            serverUrl="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary="+ title +"&url="+locationUrl  + "&pics=" + picUrl;
        }

        if($(this).is(".wb-icon")){
            serverUrl="http://v.t.qq.com/share/share.php?title="+title+"&url="+locationUrl  + "&pic=" + picUrl;
        }

        if($(this).is(".qq-icon")){
            serverUrl="http://connect.qq.com/widget/shareqq/index.html?title="+ title +"&url="+locationUrl  + "&pics=" + picUrl;
        }

        window.open(serverUrl,"newWin","scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes");
        return false;
    })


});

