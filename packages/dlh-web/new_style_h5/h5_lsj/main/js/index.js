$(document).ready(function() {
    function e() {
        var b, c, a = window.location.search;
        return a = a.replace(/\?/, ""),
        b = a.split("&"),
        c = {},
        b.forEach(function(a) {
            var d, e, b = a.split("=");
            b.length > 0 && (d = b[0],
            e = b[1],
            c[d] = e)
        }),
        c
    }
    function k() {
        var c, a = $("#iphone-number").val(), b = $("#img-captcha").val();
        return a = $.trim(a),
        b = $.trim(b),
        "" === a ? (m("手机号码不能为空"),
        !1) : (c = /^1\d{10}$/.test(a),
        c ? "" === b ? (m("请输入图片验证码"),
        !1) : !0 : (m("不是合法的手机号码"),
        !1))
    }
    function l() {
        var b, c, d, e, f, a = k();
        return a ? (b = $("#iphone-number").val(),
        c = $("#img-captcha").val(),
        d = $(".captcha-btn"),
        b = $.trim(b),
        c = $.trim(c),
        $.ajax({
            url: h,
            type: "post",
            data: {
                phoneNo: b,
                imgCode: c,
                mark: j,
                appName: '蓝水晶-H5'
            },
            dataType: "json",
            success: function(a) {
                if (200 !== a.code) {
                    var b = a.data.msg || "";
                    m(b),
                    f && clearInterval(f),
                    d.html("获取验证码"),
                    d.removeClass("disabled-btn"),
                    d.on("click", l)
                }
                /*$(".img").trigger("click")*/
            }
        }),
        d.off("click"),
        d.addClass("disabled-btn"),
        e = 60,
        d.html(e + "秒后获取"),
        f = setInterval(function() {
            if (e--,
            0 == e)
                return d.removeClass("disabled-btn"),
                d.html("获取验证码"),
                d.on("click", l),
                clearInterval(f),
                void 0;
            var a = e + "秒后获取";
            d.html(a)
        }, 1e3),
        void 0) : !1
    }
    function m(a) {
        var b;
        clearTimeout(b),
        $(".toast").html(a).removeClass("display-none"),
        b = setTimeout(function() {
            $(".toast").addClass("display-none")
        }, 1200)
    }
    var g, h, i, j, a = navigator.userAgent, b = !!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), c = !b, d = "/hs/api/v1/", f = document.documentElement.clientHeight;
    $(".root-bg").css("minHeight", f + "px"),
    $(".captcha-btn").on("click", l),
    g = d + "captcha/",
    h = d + "/sendVerifyCode",
    i = d + "/loginOrRegister",
    j = Date.now(),
    $(".img").attr("src", g + j),
    $(".img").on("click", function() {
        j = Date.now(),
        $(this).attr("src", g + j)
    }),
    $(".register-button").on("click", function() {
        var d, f, a = $("#iphone-number").val(), b = $("#iphone-captcha").val();
        if (b = $.trim(b),
        a = $.trim(a),
        d = k()) {
            if ("" === b)
                return m("请输入手机验证码"),
                void 0;
            f = e(),
            $.ajax({
                url: i,
                type: "post",
                dataType: "json",
                data: {
                    phoneNo: a,
                    msgCode: b,
                    channelId: void 0 !== f["tk"] ? f["tk"] : 1,
                    systemType: c ? "android" : "ios",
                    appName: "蓝水晶-H5"
                },
                success: function(a) {
                    200 === Number(a.code) ? (m("注册成功"),
                    setTimeout(function() {
                        var u = navigator.userAgent
                        , isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                        , selector = isiOS ? "yes" : "no";
                        if(selector=="yes"){
                            window.location.href = "./downloads2.html"
                        }else{
                            window.location.href = "./downloads.html"
                        }
                        
                    }, 1200)) : m(a.data.msg || "")
                }
            })
        }
    })
});
