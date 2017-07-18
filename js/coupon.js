$(function () {
$.ajax({
    url: 'http:\/\/127.0.0.1:3000/api/getcoupon',
    success:function (data) {
        console.log(data);
        var html = template('coupon',data);
        $('main .info').html(html)
    }
})
});
