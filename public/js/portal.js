$(function(){
    var slide={
            activeIndex:0,
            interval:5e3,
            step:1,
            timer:null,
            panels:$(".pic-slide-panel"),
            triggers:$(".pic-slide-trigger"),
            setup:function(){
                this._initPanels();
                this._initEvents();
                this.autoPlay();
            },
            _initPanels:function(){
                var panels=$(".pic-slide-panel");
                if(panels.length>0){
                    this.step= panels.length;
                }
                this.panels.hide().eq(0).show();
                this.triggers.removeClass("pic-slide-active").eq(0).addClass("pic-slide-active");
            },
            _initEvents:function(){
                var that=this;
                $(".pic-slide-prev").click(function(){
                    that.prev();
                })
                $(".pic-slide-next").click(function(){
                    that.next();
                });
                this.triggers.each(function(i){
                    $(this).on('click',function(e){
                        that.swicthTo(($(this).index()));
                    })
                })
            },
            swicthTo:function(toIndex){
                this.paused();
                this.activeIndex=toIndex;
                this.panels.hide().eq(this.activeIndex).show();
                this.triggers.removeClass("pic-slide-active").eq(this.activeIndex).addClass("pic-slide-active");
                this.autoPlay();
            },
            next:function(){
                var toIndex=0;

                if(this.activeIndex==(this.step-1)){
                    toIndex=0;
                }else{
                    toIndex=(this.activeIndex +1)
                }

                this.swicthTo(toIndex);
            },
            prev:function(){
                var toIndex=0;

                if(this.activeIndex==0){
                    toIndex=(this.step-1);
                }else{
                    toIndex=(this.activeIndex -1)
                }

                this.swicthTo(toIndex);
            },
            autoPlay:function(){
                var that=this;
                this.paused();
                this.timer = setInterval(function() {
                    that.next();
                }, this.interval);
            },
            paused:function(){
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }
    };

    slide.setup();

});