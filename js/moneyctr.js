$(function () {
    var pageid = 0 ;
        //封装获取渲染页面函数
        function getProList(all) {
            var o = {
                pageid: 0,
                callback: function (data) {
                }
            };
            for (var k in all) {
                o[k] = all[k];
            }
            $.ajax({
                url: 'http:\/\/127.0.0.1:3000/api/getmoneyctrl',
                data: {
                    'pageid': o.pageid
                },
                success: function (data) {
                    console.log(data);
                    var html = template('product_1', data);
                    $('#product').find('.info').html(html);
                    o.callback(data.totalCount);
                }
            })
        }

        //首次载入页面加载并回调totalCount的数目的总数
        getProList({
            pageid: pageid, callback: function (totalCount) {
                callback(totalCount);
            }
        });
        //回调函数 callback 后去数目总数
            function callback(tol) {
            //给下拉菜单绑定事件
            //上下页绑定
                //创建数组 强行让模板运行
                var data = Math.ceil(tol / 10)-1;
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
            //先判断是否禁用按钮
            //上一页
            //封装判断函数;
            function judge() {
                if (pageid === 0) {
                    $('.prev').prop('disabled', true).css('color', '#ccc');
                } else if (pageid > 0) {
                    $('.prev').prop('disabled', false).css('color', '#333');
                }
                //下一页
                if (pageid === Math.ceil(tol / 10)-1) {
                    $('.next').prop('disabled', true).css('color', '#ccc');
                } else if (pageid < Math.ceil(tol / 10)-1) {
                    $('.next').prop('disabled', false).css('color', '#333');
                }
            }

            judge();
            // 点击事件上一页
            $('.prev').on('click', function () {
                pageid--;
                $('.next').prop('disabled', false).css('color', '#333');
                if (pageid > 0) {
                    getProList({pageid: pageid});
                } else if (pageid ===0) {
                    getProList({ pageid: pageid});
                    $('.prev').prop('disabled', true).css('color', '#ccc');
                }
                $('.page').find('option:nth-child(' + pageid + ')').prop('selected', true).siblings('option').prop('selected', false);
                //绑定和option里面的联动;

            });

            //点击事件下一页
            $('.next').on('click', function () {
                pageid++;
                $('.prev').prop('disabled', false).css('color', '#333');
                if (pageid < Math.ceil(tol / 10)-1) {
                    getProList({ pageid: pageid});
                } else if (pageid === Math.ceil(tol / 10)-1) {
                    $('.next').prop('disabled', true).css('color', '#ccc');
                    getProList({ pageid: pageid});
                }
                $('.page').find('option:nth-child(' + pageid + ')').prop('selected', true).siblings('option').prop('selected', false);

            });

            //下拉列表onchange事件

            $('.page').on('change', function () {
                var str = $(this).val();
                // console.log(str.length);
                //判断是否有`十位数
                if(str.length===4){

                    pageid = str.substring(0, 1);
                    // console.log(pageid);

                }else if(str.length===3) {
                    //个位数
                    pageid = str.substring(0, 1) - 0;
                    // console.log(pageid);

                }else if(str.length===5){
                    pageid = str.substring(0, 2) - 0;
                    // console.log(pageid);
                }
                // console.log(pageid);
                //调用判断函数
                judge();
                //调用渲染页面函数
                getProList({ pageid: pageid});
                // 说明有十位数
            });

        }


});