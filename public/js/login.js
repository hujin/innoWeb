$(function(){
    $(".ui-input").blur(function(){
        if($(this).val() != ''){
            $(this).next("label").hide();
        }else{
            $(this).next("label").show();
        }
    });

    $(".ui-input").keyup(function(){
        if($(this).val() != ''){
            $(this).next("label").hide();
        }else{
            $(this).next("label").show();
        }
    });

    $(".ui-input").focus(function(){
        $(this).parent().find(".ui-tip").animate({opacity:0});
    });

    $(".ui-button").click(function(){
        var id= $("#idInput").val(),
            password = $("#passwordInput").val();

        if(!id){
            $(".idLine").find(".ui-tip-message").text("请输入用户名!");
            $(".idLine").find(".ui-tip").animate({opacity:1});
        }

        if(!password){
            $(".passwordLine").find(".ui-tip-message").text("请输入密码!");
            $(".passwordLine").find(".ui-tip").animate({opacity:1});
        }
    });

    $(window).load =function(){
        if($("#idInput").val() != ''){
            $("#idInput").next("label").hide();
        }

        if($("#passwordInput").val() != ''){
            $("#passwordInput").next("label").hide();
        }
    }

});