$(function () {
    function getUrlParam(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }

    function getUrl() {
        // 获取参数
        return window.location.search;

    }


    var url = getUrl();
    var categoryid = getUrlParam('categoryid');
    var productid = getUrlParam('productid');
    //3级菜单参数
    $.ajax({
        url: 'http:\/\/127.0.0.1:3000/api/getcategorybyid',
        data: {categoryid: categoryid},
        success: function (data) {
            console.log(data);
            $('.productlist').find('a:nth-child(2)').text(data.result[0].category + '>').attr('href', 'bijia.html?title=' + data.result[0].category + '&categoryid=' + categoryid + '');


        }
    });
    //实现页面加载
    $.ajax({
        url: 'http:\/\/127.0.0.1:3000/api/getproduct',
        data: {productid: productid},
        success: function (data) {
            console.log(data);
            var data = data.result[0];
            $('.productlist').find('a:nth-child(3)').text(
                data.productName
            ).css({'width': '100px', 'overflow': "hidden", "text-align": "left"});
            //加载详情内容
            //图片
            $('main .pic').html(data.productImg);
            //标题
            $('main .title').html(data.productName);
            //比价
            $('main .makeprice').html(data.bjShop)
            //评论
            $.ajax({
                url:'http:\/\/127.0.0.1:3000/api/getproductcom',
                data:{productid:productid},
                success:function (data) {
                    // console.log(data);
                    var html = template('comment',data);
                    $('.comment .content').html(html);
                }
            })
        }


    })
});

