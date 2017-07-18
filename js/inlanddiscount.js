    $(function () {
        //适配屏幕
        //获取浏览器上的数据
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





        //封装获取渲染页面函数
        function getProList(all) {
            var o = {
                callback: function (data) {
                }
            };
            for (var k in all) {
                o[k] = all[k];
            }
            $.ajax({
                url: 'http:\/\/127.0.0.1:3000/api/getinlanddiscount',
                success: function (data) {
                    o.callback(data);
                }
            })
        }

        // 全局变量 让窗口滚动加载
        var num = 4;

        //首次载入页面加载 调用加载页面面函数
        getProList({
            callback: function (data) {
                // console.log(data);

                // 首次载入调用设置html 4 个参数
                setHtml(num);

                // 封装截取数据的函数
               function setHtml( num ) {
                   //新建一个对象,好让模板遍历;
                   var o1 = {};
                   //保持属性和原来的一致
                   var result = [];
                   // 截取数组,动态变量num
                   var data1 = data.result.slice(0,num);
                   // 遍历截取的数据 添加到result
                   for (var i = 0;i<data1.length;i++){
                       result.push(data1[i]);
                   }
                   //给o1设置属性
                   o1.result=result;
                   // console.log(o1);
                   //调用模板
                   var html = template('product_1',o1);
                   $('.info').html(html);
               }

               //window滚动事件
                window.onscroll = function () {
                    var start = 20;
                    var scrollTop = parseFloat(document.body.scrollTop);
                    var totalHeiht = parseFloat(document.body.scrollHeight);
                    var clientHeight = parseFloat(document.body.clientHeight);
                    var total = clientHeight + scrollTop;
                    if (totalHeiht - total <= 20 && num <= 20) {
                        num+=4;
                        //调用设置html函数
                        setHtml(num);
                    }


                };
            }
        });


    });
