$(function () {
    var pageid;
    var html = document.getElementsByTagName('html')[0];
    // console.log(html);
    /*取到屏幕的宽度*/
    var width = window.innerWidth;
    // console.log(width);
    /* 640 100  320 50 */
    var fontSize = 100 / 640 * width;
    // console.log(fontSize);
    /*设置fontsize*/
    html.style.fontSize = fontSize + 'px';

    window.onresize = function () {
        var html = document.getElementsByTagName('html')[0];
        // console.log(html);
        /*取到屏幕的宽度*/
        var width = window.innerWidth;
        // console.log(width);
        /* 640 100  320 50 */
        var fontSize = 100 / 640 * width;
        // console.log(fontSize);
        /*设置fontsize*/
        html.style.fontSize = fontSize + 'px';

    };

    var areaid = 0;
    var shopid = 0;

    //获取店铺地址
    $('.shop').click(function () {
        $.ajax({
                url: "http:\/\/127.0.0.1:3000/api/getgsshop",
                success: function (data) {
                    var html = template('shop', data);
                    $('.infoB').html(html);
                    $('.from').toggleClass('show');
                    $('.shop span:nth-child(2)').text('▲');
                    $('.infoB li').click(function () {
                        var text = $(this).text();
                        shopid = $(this).data('shopid');
                        $('.shop span:nth-child(1)').text(text);
                        $('.shop span:nth-child(2)').text('▼');

                        // $(text).insertBefore('span');
                        $('.from').toggleClass('show');
                        setHtml(shopid, areaid);
                        console.log(shopid);
                    })
                }
            }
        );
    });
    //获取地区地址
    //绑定点击事件
    var num = 0;
    $('.place').click(function () {
        $.ajax({
            url: "http:\/\/127.0.0.1:3000/api/getgsshoparea",
            success: function (data) {
                var html = template('area', data);
                // 点击大框框的时候的事件
                $('.infoB').html(html);
                $('.from').toggleClass('show');
                $('.place span:nth-child(2)').text('▲');
                $('.infoB li').click(function () {
                    //点击下拉菜单的事件
                    //截取前两个字 不然自太长
                    //设置点击后大方框的内容
                    var text = $(this).text().substr(0, 2);
                    //点击后 让areaid等于当前点击的li保存的areaid;
                    areaid = $(this).data('areaid');
                    $('.place span:nth-child(1)').text(text);
                    $('.place span:nth-child(2)').text('▼');

                    // 点击的时候隐藏和显示
                    $('.from').toggleClass('show');
                    // 调用渲染页面函数
                    setHtml(shopid, areaid);
                    // console.log(areaid);
                })

            }
        })
    });

    setHtml(shopid, areaid);

    //渲染页面函数
    function setHtml(shopid, areaid) {
        $.ajax({
            url: "http:\/\/127.0.0.1:3000/api/getgsproduct",
            data: {shopid: shopid, areaid: areaid},
            success: function (data) {
                var html = template('productList', data);
                $('#product .info').html(html);
            }
        })
    }
});
