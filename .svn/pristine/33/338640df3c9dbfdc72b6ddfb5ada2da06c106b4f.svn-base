$(function(){
    $(".engage-salary .rline").click(function(e){
        var position=$(this).attr("data-position").split(","),
            id=$(this).attr("data-id"),
            url ='/invite/getPost?ID='+id;

        $.ajax({
            url:url,
            type:'get',
            success:function(result){
                if(result.length>0){
                    obj=result[0];
                    $(".salary-box-container h5").html(obj.jobName);
                    $("#salary-num").text(obj.jobNum);
                    $("#salary-edu").text(obj.jobEdu);
                    $("#salary-exp").text(obj.jobExp);
                    $("#salary-pay").text(obj.jobPay);
                    $("#salary-tags").html(obj.jobTags);
                    $("#salary-name").html(obj.jobName);
                    $("#salary-desc").html(obj.jobDesc);
                    $("#salary-req").html(obj.jobReq);
                    $("#salary-resp").html(obj.jobResp);
                    $(".salary-box").css("left",position[0] + "px");
                    $(".salary-box").css("bottom",position[1] + "px");
                    $(".salary-box").show();
                }
            }
        });

    });

    $(".salary-box-box-close").click(function(){
        $(".salary-box").hide();
    })
})