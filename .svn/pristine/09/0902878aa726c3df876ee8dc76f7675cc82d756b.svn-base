$(function(){
    var showTimer,
        hideTimer,
        index,
        length=$(".main-nav li").length;
    $(".main-nav li").mouseenter(function(){
        index=$(this).index();
        if(index>0 && index !=(length-1)){
            clearTimeout(hideTimer);
            hideTimer=null;
            $(".main-nav li").find("a").removeClass("hover");

            $(this).find("a").addClass("hover");
            $(".sub-nav ul").hide().eq((index-1)).show();

            $(".sub-nav").css("left", (515 + (95*(index-1))) + "px");

            showTimer = setTimeout(function() {

                $(".sub-nav").show();
            }, 200);
        }


    }).mouseleave(function(){
            clearTimeout(showTimer);
            showTimer=null;

            hideTimer=setTimeout(function(){
                $(".sub-nav").hide();
                $(".main-nav li").find("a").removeClass("hover");
            },200);

        });

    $(".sub-nav").mouseenter(function(){
        clearTimeout(hideTimer);
        hideTimer=null;
        showTimer = setTimeout(function() {
            $(".sub-nav").show();
        }, 200);
    }).mouseleave(function(){
            clearTimeout(showTimer);
            showTimer=null;

            hideTimer=setTimeout(function(){
                $(".sub-nav").hide();
                $(".main-nav li").find("a").removeClass("hover");
            },200);

     });
    //给main一个最小高度，保证footer能在最底下
    $(window).on({
         load:function(){
             $(".main").css("min-height",($(window).height() - 201)+"px");
         },
         resize:function(){
             $(".main").css("min-height",($(window).height() - 201)+"px");
         }
    });

    var mv_dynamic_to_top = {"text":"0","version":"0","min":"200","speed":"1000","easing":"easeInOutExpo","margin":"20"};


    (function($,mv_dynamic_to_top){
        jQuery.fn.DynamicToTop=function(options){
            var defaults={
                    text:mv_dynamic_to_top.text,
                    min:parseInt(mv_dynamic_to_top.min,10),
                    fade_in:600,
                    fade_out:400,
                    speed:parseInt(mv_dynamic_to_top.speed,10),
                    easing:mv_dynamic_to_top.easing,
                    version:mv_dynamic_to_top.version,
                    id:'dynamic-to-top'
                },
                settings=$.extend(defaults,options);


            if(!$.isFunction(settings.easing)){
                settings.easing='linear';
            }
            var $toTop=$("#dynamic-to-top");
            $toTop.click(function(){
                $('html, body').stop().animate({scrollTop:0},
                    settings.speed,settings.easing);
                return false;
            });
            $(window).scroll(function(){
                var sd=jQuery(window).scrollTop();

                if(typeof document.body.style.maxHeight==="undefined"){
                    $toTop.css({'position':'absolute','top':sd+$(window).height()-mv_dynamic_to_top.margin});
                }
                if(sd>settings.min){;
                    $toTop.fadeIn(settings.fade_in);
                }else{
                    $toTop.fadeOut(settings.fade_out);
                }
            });
        };
        $('body').DynamicToTop();
    })(jQuery,mv_dynamic_to_top);

})