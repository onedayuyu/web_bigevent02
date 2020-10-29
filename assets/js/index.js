$(function() {
    getUserInfo()

    //退出事件
    $("#btnexit").on("click", function() {
        layer.confirm('确定需要退出吗', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token")
            location.href = "/login.html"

            layer.close(index);
        });
    })
})


// 获取用户信息(封装到入口函数的外面了)
function getUserInfo() {

    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            // console.log('nihao');
            if (res.status !== 0) {
                return layui.layer.msg(res.message)

            }
            randerAvatar(res.data)

        }
    })
}

function randerAvatar(user) {
    // console.log("你好");
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic) {
        //有头像
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $(".text-avatar").hide()
    } else {
        var first = name[0].toUpperCase()

        $(".text-avatar").html(first).show()
        $('.layui-nav-img').hide()

    }
}