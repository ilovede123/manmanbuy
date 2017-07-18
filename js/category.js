$(function () {
    $.ajax({
        url: "http:\/\/127.0.0.1:3000/api/getcategorytitle",
        // data: {'titleId': 0},
        success: function (data) {
            var html = template('product', data);
            $('#accordion').html(html);
            //给标题里面链式添加内容
            var as = $('#accordion').find('h4 a');
            var i;
            //获取所有类名row的div
            var rows = document.querySelectorAll('.panel-collapse .row');
            //声明数组储存html
            var arr = [];
            //循环调用ajax请求不同的参数
            for (i = 0; i < as.length; i++) {
                var tid = as[i].dataset.titleid;
                $.ajax({
                    url: 'http:\/\/127.0.0.1:3000/api/getcategory',
                    data: {'titleid': tid},
                    success: function (data) {
                        console.log(data);
                        var html1 = template('product_1', data);
                        arr.push(html1);
                        //遍历数组,给每个div添加不同的数据
                        for (var j = 0; j < arr.length; j++) {
                            // console.log(j);
                            rows[j].innerHTML = arr[j];
                        }
                    }

                });
            }

        }
    })
});
//
// console.log($(this).href);
