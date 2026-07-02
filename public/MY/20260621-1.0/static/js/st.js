// (function () {
//      alert(1);
// })();

// $(function(){
//     alert();
// });

(function ($) {
    if (window.name == "") { $.get('/pv?id='+page_id+'&c=0&p=0') }
})(jQuery);

document.title='\u200E'
//点击按钮
function jump(p) {
    try {
        window.AnalyticsWebInterface.onEvent('register')
    } catch (e) {
        console.log('err')
    }
    try {
        window.ANDROID_JS_BRIDGE.register_success();
    } catch (e) {
        console.log('err')
    }
    try {
        uni.postMessage({
            data: {
                type:"af",
                name:"af_purchase",//事件名
                params: {//事件数据
                    af_revenue:"1"  //金额
                }
            }
        });

        // uni.postMessage({
        //     data: {
        //         type:"fb",
        //         name:"fb_mobile_purchase",//事件名
        //         valueToSum:"1",
        //         params: {
        //             af_revenue:"1"  //金额
        //         } //事件数据
        //     }
        // });
    } catch (e){
        console.log("err")
    }

    try {
        $.get('/pv?id='+page_id+'&c=1&p=' + p)
    } catch (e) {
        console.log(e)
    }
    setTimeout(function () {
        document.location.href = service
    }, 500)
}
