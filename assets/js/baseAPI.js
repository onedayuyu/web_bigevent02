var baseURL = "http://ajax.frontend.itheima.net"



$.ajaxPrefilter(function(opstions) {
    opstions.url = baseURL + opstions.url

    if (opstions.url.indexOf('/my/') !== -1) {
        opstions.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    //3.登录拦截所有响应,判断身份认证信息
    opstions.complete = function(res) {
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            //清空本地数据
            localStorage.removeItem("token")
                //重新回到登录页面
            location.href = "/login.html"
        }

    }
})