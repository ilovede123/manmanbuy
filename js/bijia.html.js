$(function () {
    //获取浏览器上的数据
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
    var title = getUrlParam('title') + '>';
    var categoryid = getUrlParam('categoryid');
    var pageid = pageid || 1;
    //实现三级菜单
    $('#subNav').find('a:nth-child(3)').text(title).attr('href', url);
    $('#subNav').find('a:nth-child(2)').attr('href', 'category.html');

    //请求ajax获取商品信息


    //封装获取渲染页面函数
    function getProList(all) {
        var o = {
            categoryid: 0,
            pageid: 1,
            callback: function (data) {
            }
        };
        for (var k in all) {
            o[k] = all[k];
        }
        $.ajax({
            url: 'http:\/\/127.0.0.1:3000/api/getproductlist',
            data: {
                'categoryid': o.categoryid,
                'pageid': o.pageid
            },
            success: function (data) {
                // console.log(data);
                var html = template('product', data);
                $('.bijia_info').find('.info').html(html);
                o.callback(data.totalCount);
            }
        })
    }

    //首次载入页面加载并回调totalCount的数目的总数
    getProList({
        categoryid: categoryid, pageid: pageid, callback: function (totalCount) {
            callback(totalCount);
        }
    });
    //回调函数 callback 后去数目总数
    function callback(tol) {
        //给下拉菜单绑定事件

        //创建数组 强行让模板运行
        var data = Math.ceil(tol / 10);
        //创建对象
        var obj = {};
        var arr = [];
        for (var i = 0; i < data; i++) {
            arr.push(obj);
            arr[i].totalCount = data;
        }
        //再创建一个对象让模板遍历
        var data1 = {};
        data1.much = arr;
        //把自制对象添加到模板
        var html = template('option', data1);
        console.log(arr);
        $('.page').html(html);
        console.log(data1);

        //上下页绑定

        //先判断是否禁用按钮
        //上一页
        //封装判断函数;
        function judge() {
            if (pageid === 1) {
                $('.prev').attr('disabled', true).css('color', '#ccc');
            } else if (pageid > 1) {
                $('.prev').attr('disabled', false).css('color', '#333');
            }
            //下一页
            if (pageid === Math.ceil(tol / 10)) {
                $('.next').attr('disabled', true).css('color', '#ccc');
            } else if (pageid < Math.ceil(tol / 10)) {
                $('.next').attr('disabled', false).css('color', '#333');
            }
        }

        judge();
        // 点击事件上一页
        $('.prev').on('click', function () {
            pageid--;
            $('.next').attr('disabled', false).css('color', '#333');
            if (pageid > 1) {
                getProList({categoryid: categoryid, pageid: pageid});
            } else if (pageid = 1) {
                getProList({categoryid: categoryid, pageid: pageid});
                $('.prev').attr('disabled', true).css('color', '#ccc');
            }
            $('.page').find('option:nth-child(' + pageid + ')').prop('selected', true).siblings('option').prop('selected', false);
            //绑定和option里面的联动;

        });

        //点击事件下一页
        $('.next').on('click', function () {
            pageid++;
            $('.prev').attr('disabled', false).css('color', '#333');
            if (pageid < Math.ceil(tol / 10)) {
                getProList({categoryid: categoryid, pageid: pageid});
            } else if (pageid === Math.ceil(tol / 10)) {
                $('.next').attr('disabled', true).css('color', '#ccc');
                getProList({categoryid: categoryid, pageid: pageid});
            }
            $('.page').find('option:nth-child(' + pageid + ')').prop('selected', true).siblings('option').prop('selected', false);

        });

        //下拉列表onchange事件

        $('.page').on('change', function () {
            var str = $(this).val();
            pageid = str.substring(0, 1) - 0;
            //调用判断函数
            judge();
            //调用渲染页面函数
            getProList({categoryid: categoryid, pageid: pageid});
        });

    }


});