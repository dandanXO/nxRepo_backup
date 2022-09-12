$(document).ready(function() {
    var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var isAndroid = !isiOS;
    var baseUrl = '/hs/api/v1/';
    function getLoactionParams() {
        var search = window.location.search;
        search = search.replace(/\?/, '');
        var arr = search.split('&');
        var obj = {};
        arr.forEach(function(item) {
          var current = item.split('=');
          if (current.length > 0) {
                var key = current[0], value = current[1];
                obj[key] = value;
          }  
        });
        return obj;
    }

    var height = document.documentElement.clientHeight;
    $('.root-bg').css('minHeight',height+'px');
    $('.captcha-btn').on('click', handleClick);

    //图片验证码
    var imgUrl = baseUrl + 'captcha/';
    var getPhoneNumberUrl = baseUrl + '/sendVerifyCode';
    var registerUrl = baseUrl + '/loginOrRegister'
    var imgMark = Date.now();
    $('.img').attr('src', imgUrl + imgMark);
    $('.img').on('click', function() {
        imgMark = Date.now();
        $(this).attr('src',imgUrl + imgMark);
    })

    
    function checkOut() {
        var number = $('#iphone-number').val();
        var imgCaptcha = $('#img-captcha').val();
        number = $.trim(number);
        imgCaptcha = $.trim(imgCaptcha);
        if(number === '') {
            showToast('手机号码不能为空');
            return false;
        }
        var isPhoneNumber = /^1\d{10}$/.test(number);
        if(!isPhoneNumber) {
            showToast('不是合法的手机号码');
            return false;
        }
        if(imgCaptcha === '') {
            showToast('请输入图片验证码');
            return false;
        }
        return true;
    }
    function handleClick() {
        // if (isAndroid) {
        //     showToast('安卓手机暂不支持！');
        //     return;
        // }
        var isOk = checkOut();
        if(!isOk) {
            return false;
        }
        var number = $('#iphone-number').val();
        var imgCaptcha = $('#img-captcha').val();
        var btn = $('.captcha-btn');
        number = $.trim(number);
        imgCaptcha = $.trim(imgCaptcha);
        $.ajax({
            url: getPhoneNumberUrl,
            type : 'post',
            data: {
                phoneNo: number,
                imgCode: imgCaptcha,
                mark: imgMark,
                appName: '小骑士-H5'
            },
            dataType: 'json',
            success: function(data) {
                if(data.code !== 200) { 
                    var msg = data.data.msg || '';
                    showToast(msg); 
                    timer && clearInterval(timer);
                    btn.html('获取验证码');
                    btn.removeClass('disabled-btn');
                    btn.on('click', handleClick);
                }
                $('.img').trigger('click');
            }
            
        })
    
        btn.off('click');
        btn.addClass('disabled-btn');
        var index = 60;
        btn.html(index + '秒后获取');
        var timer = setInterval(function(){
            index--;
            if(index == 0) {
                btn.removeClass('disabled-btn');
                btn.html('获取验证码');
                btn.on('click', handleClick);
                clearInterval(timer);
                return;
            }
            var text = index + '秒后获取';
            btn.html(text);
        },1000);
    }
    function showToast(msg) {
        var timer;
        clearTimeout(timer)
        $('.toast').html(msg).removeClass('display-none');
        timer = setTimeout(function(){
            $('.toast').addClass('display-none');
        },1200);
    }
    $('.register-button').on('click',function() {

        // if(isAndroid) {
        //     showToast('安卓手机暂不支持！');
        //     return;
        // }

        var number = $('#iphone-number').val();
        var captcha = $('#iphone-captcha').val();

        captcha = $.trim(captcha);
        number = $.trim(number);
        var isOk = checkOut();
        if(!isOk) {
            return;
        }
        if(captcha === '') {
            showToast('请输入手机验证码');
            return;
        }
        var obj = getLoactionParams();
        //注册
        $.ajax({
            url: registerUrl,
            type: 'post',
            dataType: 'json',
            data: {
                phoneNo: number,
                msgCode: captcha,
                channelId: obj['tk'] !== undefined ? obj['tk'] : 1,
                systemType: isAndroid ? 'android' : 'ios',
                appName: '小骑士-H5'
            },
            success: function(data) {
                if (Number(data.code) === 200) {
                    showToast('注册成功');
                    setTimeout(function() {
                        window.location.href = './load.html';
                    },1200)

                } else {
                    showToast(data.data.msg || '');
                }
            }
        });  
    });

})