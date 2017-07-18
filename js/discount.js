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

    var productid = getUrlParam('productid');


    function getProList(all) {
        var o = {
            url:0,
            productid: 0,
            callback: function (data) {
            }
        };
        for (var k in all) {
            o[k] = all[k];
        }
        $.ajax({
            url: o.url,
            productid: o.productid,
            success: function (data) {
                o.callback(data);
            }
        })
    }//获取页面内容函数
    // 获取浏览器参数
    var title = getUrlParam('title') || null;

    // 判断 如果有的话就加载国内折扣详情
    if (title) {
        $('#header').find('h4').text(title);

        $.ajax({
            url: 'http:\/\/127.0.0.1:3000/api/getdiscountproduct',
            data: {productid: productid},
            success: function (data) {
                console.log(data);
                var html = template('product_1', data);
                $('#product').find('.info').html(html);
                //评论
                var html2 = template('comment', data);
                $('.comment').html(html2);
            }
        })

    } else {
        $.ajax({
            url: 'http:\/\/127.0.0.1:3000/api/getmoneyctrlproduct',
            data: {productid: productid},
            success: function (data) {
                console.log(data);
                var html = template('product_1', data);
                $('#product').find('.info').html(html);
                //评论
                var html2 = template('comment', data);
                $('.comment').html(html2);
            }
        })
    }





    // 掉取评论


});