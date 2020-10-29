$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //登录正则表达式认证

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    //注册ajax提交表单数据
    $('#form-reg').on('submit', function(e) {

        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功 ! 请登录")
                $("#link_login").click()
                    // 注册完之后清空注册表单信息
                $('#form-reg')[0].reset()

            }
        })
    })

    //登录ajax提交表单数据
    $("#form-login").on('submit', function(e) {
        console.log("你好");

        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                localStorage.setItem('token', res.token)
                console.log("你好");
                location.href = "/index.html"
            }

        })
    })

})