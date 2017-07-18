$(function () {
    var pageid = 1;
    //封装获取渲染页面函数
    function getProList(callback) {
        var o = {
            pageid: 1,
            callback: callback
        };
        $.ajax({
            url: 'http:\/\/127.0.0.1:3000/api/getbaicaijiatitle',
            data: {
                'pageid': o.pageid
            },
            success: function (data) {
                console.log(data);
                var html = template('nav_1', data);
                $('.navList').html(html);
                touch();
                o.callback();
                //导航点击事件
                $('.navList>li').click(function () {
                    var titleid = $(this).data('titleid');
                    $(this).css({'color':'#fc353a'}).siblings('li').css({
                        'color':'','border':'none'
                    });
                    $(this).css({'borderBottom':'2px solid #fc353a'}).siblings('li').css({
                        'color':'','border':'none'
                    });
                    $.ajax({
                        url:'http:\/\/127.0.0.1:3000/api/getbaicaijiaproduct',
                        data:{titleid:titleid},
                        success:function (data) {
                            var html = template('product_1',data);
                            $('.info').html(html);
                        }
                    })
                })
            }
        })
    }
    //回调函数;
    getProList(function () {
        $.ajax({
            url:'http:\/\/127.0.0.1:3000/api/getbaicaijiaproduct',
            data:{titleid:0},
            success:function (data) {
                var html = template('product_1',data);
                $('.info').html(html);
            }
        })
    });
    //回调函数 callback 后去数目总数
    //封装touch
    function touch() {
        //获取ul
        var ul = document.querySelector('.navList');
        //获取遮罩
        var marsk = document.querySelector('.marsk');
        //定义三个属性 starx movx distancex totalx等
        var startX, moveX, distanceX, totalX, maxLeft, maxRight;
        //获取li
        var lis = document.querySelectorAll('.navList>li');
        //设置ul的长度
        ul.style.width = lis.length * lis[0].offsetWidth + 'px';
        //往右滑动最大距离
        maxLeft = 0;
        //往左滑动最大距离
        maxRight = marsk.offsetWidth - ul.offsetWidth;
        //滑动的时候最大距离
        maxMoveLeft = maxLeft + 50;
        maxMoveright = maxRight - 50;
        //这个变量用来保存上一次滑动的距离 totalX+=distansX
        totalX = 0;
        // console.log(maxRight);
        // console.log(maxMoveLeft);
        // console.log(maxMoveright);
        ul.addEventListener("touchstart", function (e) {
            /*获取当前手指的起始位置*/
            startX = e.targetTouches[0].clientX;
            // console.log(startX);
        });

        ul.addEventListener('touchmove', function (e) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            if (totalX + distanceX > maxMoveLeft || totalX + distanceX < maxMoveright) {
                return;
            } else {
                //先清除过度
                ul.style.transition = 'none';
                ul.style.left = distanceX + totalX + 'px';
                // console.log(totalX);
                // console.log(maxRight);
            }

        });

        ul.addEventListener('touchend', function () {
            //如果往左滑动的距离>0
            if (totalX + distanceX > maxMoveLeft) {
                ul.style.left = 0 + 'px';
                ul.style.transition = '.5s';
                totalX=0;
                //回弹
            } else if (totalX + distanceX < maxMoveright) {
                totalX = maxRight;
                ul.style.left = maxRight + 'px';
                ul.style.transition = '.5s';
            }
            else {
                totalX += distanceX;
            }

        });
    }


    //进度条
    function bar() {
        var barWidth = $('.bar').width();
        // var bar_inWidth =$('.bar_in').width();
        // console.log(bar_inWidth);
        // console.log(barWidth);
        var str = $('.yiling').text().substr(2, 4) - 0;
        var totalStr = 126;
        var totalStrs = 126;
        var yilingStr = 0;
        //刚载入时候的值
        $('.bar_in').text(parseInt((yilingStr / totalStrs) * 100) + '%');
        // 已领取值
        $('.yiling').text('已领' + yilingStr + '张/剩余' + totalStr + '张');
        if (totalStr === 0) {
            clearInterval(int);
        }
        var int = setInterval(function () {
            totalStr--;
            yilingStr++;
            // 红色长度
            var inWidth = barWidth * (yilingStr / totalStrs);
            //设置红色长度
            $('.bar_in').width(inWidth + 'px');
            //百分比的值
            $('.bar_in').text(parseInt((yilingStr / totalStrs) * 100) + '%');
            // 已领取值
            $('.yiling').text('已领' + yilingStr + '张/剩余' + totalStr + '张');
            if (totalStr === 0) {
                clearInterval(int);
            }


        }, 50);
    }

    bar();

});