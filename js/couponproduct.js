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

    var couponproductid = getUrlParam('couponid');
    //请求ajax获取页面数据


    $.ajax({
        url: 'http:\/\/127.0.0.1:3000/api/getcouponproduct',
        data: {couponid: couponproductid},
        success: function (data) {
            // console.log(data);
            var html = template('couponproduct', data);
            $('#product .info').html(html);
            $.ajax({
                url: 'http:\/\/127.0.0.1:3000/api/getcouponproduct',
                data: {couponid: couponproductid},
                success: function (data) {
                    console.log(data);
                    var html = template('carousel_1', data);
                    $('.carousel .marskSm .info').html(html);
                    //设置ul的宽度
                    var ul = document.querySelector('.marskSm .info');
                    var lis = document.querySelectorAll('.marskSm li');
                    ul.style.width = lis.length * lis[0].offsetWidth + 'px';
                    //点击两个箭头轮播
                    //右边箭头

                    //添加节流阀
                    var index = 0;
                    var flag = true;
                    $('.arrRight').click(function (num) {
                        if (flag) {
                            flag = false;
                            index++;
                            if (index <= lis.length-1) {
                                ul.style.transform = 'translateX(' + -index * lis[0].offsetWidth + 'px' + ')';
                                ul.style.transition = '.5s ease-in-out'
                            } else {
                                index = lis.length-1;
                                alert('已经是最后一页啦');
                                flag = true;
                            }
                        }
                        //添加过度结束监听事件
                        ul.addEventListener('webkitTransitionEnd', function () {
                            flag = true;
                        })
                    });
                    //左边箭头
                    $('.arrLeft').click(function (num) {

                        if (flag) {
                            index--;
                            flag = false;
                            if (index >= 0) {
                                ul.style.transform = 'translateX(' + -index * lis[0].offsetWidth + 'px' + ')';
                                ul.style.transition = '.5s ease-in-out'
                            } else {
                                index = 0;
                                alert('已经是第一页啦');
                                // return;
                                flag = true;
                            }
                        }
                        ul.addEventListener('webkitTransitionEnd', function () {
                            // flag = true;
                        })
                    });
                    //每一个单个点击事件
                    $('#product .info').find('li').click(function () {
                        $('.carousel').css({'transform': 'translateY(0px)', 'transition': '.7s ease-in-out'});
                        ul.style.transition = 'none';
                        index = $(this).data('index');
                        ul.style.transform = 'translateX(' + -index * lis[0].offsetWidth + 'px' + ')';
                    });

                    //关闭点击事件
                    $('.marskSm').find('i').click(function () {
                        $('.carousel').css('transform', 'translateY(-1000px)');
                    })
                }
            })
        }
    });
    //轮播图
    // $.ajax({
    //     url: 'http:\/\/127.0.0.1:3000/api/getcouponproduct',
    //     data: {couponid: couponproductid},
    //     success: function (data) {
    //         console.log(data);
    //         var html = template('carousel_1', data);
    //         $('.carousel .marskSm .info').html(html);
    //         //设置ul的宽度
    //         var ul = document.querySelector('.marskSm .info');
    //         var lis = document.querySelectorAll('.marskSm li');
    //         ul.style.width = lis.length * lis[0].offsetWidth + 'px';
    //         //点击两个箭头轮播
    //         //右边箭头
    //
    //         //添加节流阀
    //         var index = 0;
    //         var flag = true;
    //         $('.arrRight').click(function (num) {
    //             if (flag) {
    //                 flag = false;
    //                 index++;
    //                 if (index <= lis.length-1) {
    //                     ul.style.transform = 'translateX(' + -index * lis[0].offsetWidth + 'px' + ')';
    //                     ul.style.transition = '.5s ease-in-out'
    //                 } else {
    //                     index = lis.length-1;
    //                     alert('已经是最后一页啦');
    //                     flag = true;
    //                 }
    //             }
    //             //添加过度结束监听事件
    //             ul.addEventListener('webkitTransitionEnd', function () {
    //                 flag = true;
    //             })
    //         });
    //         //左边箭头
    //         $('.arrLeft').click(function (num) {
    //
    //             if (flag) {
    //                 index--;
    //                 flag = false;
    //                 if (index >= 0) {
    //                     ul.style.transform = 'translateX(' + -index * lis[0].offsetWidth + 'px' + ')';
    //                     ul.style.transition = '.5s ease-in-out'
    //                 } else {
    //                     index = 0;
    //                     alert('已经是第一页啦');
    //                     // return;
    //                     flag = true;
    //                 }
    //             }
    //             ul.addEventListener('webkitTransitionEnd', function () {
    //                 // flag = true;
    //             })
    //         });
    //         //每一个单个点击事件
    //         $('#product .info').find('li').click(function () {
    //             $('.carousel').css({'transform': 'translateY(0px)', 'transition': '.7s ease-in-out'});
    //             ul.style.transition = 'none';
    //             index = $(this).data('index');
    //             ul.style.transform = 'translateX(' + -index * lis[0].offsetWidth + 'px' + ')';
    //         });
    //
    //         //关闭点击事件
    //         $('.marskSm').find('i').click(function () {
    //             $('.carousel').css('transform', 'translateY(-1000px)');
    //         })
    //     }
    // })
});

