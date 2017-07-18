$(function () {
    $.ajax({
        url:"http:\/\/127.0.0.1:3000/api/getindexmenu",
        type:"get",
        success:function (data) {
            var html = template("nav_tem",data);
            // console.log(data);
            //点击更多隐藏
            $('#info').html(html);
            $("#info div:nth-child(8)").click(function () {
                $("#info div:nth-last-child(-n+4)").finish().slideToggle(200)
            })

        }
    });

    $.ajax({
        url:"http:\/\/127.0.0.1:3000/api/getmoneyctrl",
        success:function (data) {
            // console.log(data);
            var html = template('product_t',data);
            $('#product>.info').html(html)
        }

    });
    //家电请求

});