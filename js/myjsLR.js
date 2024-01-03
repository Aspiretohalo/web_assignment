$(window).on('load', function () {

    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, 'index.html');
    });


    var turnTo = document.querySelector('.turnTo')
    var flag = true
    turnTo.addEventListener('click', function () {
        console.log(1);
        if (flag) {
            document.querySelector('.lrcard2').style.cssText = " transform: perspective(1000px) rotateY(0deg);";
            document.querySelector('.lrcard1').style.cssText = " transform: perspective(1000px) rotateY(180deg);backface-visibility: hidden;";
            flag = false
        } else {
            document.querySelector('.lrcard1').style.cssText = " transform: perspective(1000px) rotateY(0deg);";
            document.querySelector('.lrcard2').style.cssText = " backface-visibility: hidden;transform: perspective(1000px) rotateY(-180deg);";
            flag = true
        }

    })
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    // Array.from(forms).forEach(form => {
    //     form.addEventListener('submit', event => {
    //         if (!form.checkValidity()) {
    //             event.preventDefault()
    //             event.stopPropagation()
    //         }

    //         form.classList.add('was-validated')
    //     }, false)
    // })



    // 登录
    var username = document.querySelector('.username')
    var un_label = document.querySelector('.un_label')
    username.addEventListener('blur', function () {
        var uname = this.value;
        const reg = /^\d{6,10}$/;
        if (!reg.test(uname)) {
            un_label.innerHTML = '用户名长度错误'
            return;
        } else {
            un_label.innerHTML = '请输入用户名'
            return;
        }
    })

    var psw_log = document.querySelector('.psw_log')
    var psw_log_label = document.querySelector('.psw_log_label')
    psw_log.addEventListener('blur', function () {
        var password_log = this.value;
        // const reg = /^{6,20}$/
        // if (!reg.test(password_log)) {
        //     psw_log_label.innerHTML = '密码长度不合法'
        //     return;
        // }
    })

    // 注册
    var flag1 = false
    var flag2 = false
    var flag3 = false
    var username2 = document.querySelector('.username2')
    var username2_label = document.querySelector('.username2_label')
    username2.addEventListener('blur', function () {
        var Nname = this.value;
        const reg = /^\d{6,10}$/;
        if (!reg.test(Nname)) {
            username2_label.innerHTML = '用户名不合法'
            flag1 = false
            return;
        } else {
            username2_label.innerHTML = '用户名可用'
            flag1 = true
            return;
        }
    })
    var psw = document.querySelector('.psw')
    var psw_label = document.querySelector('.psw_label')
    psw.addEventListener('blur', function () {
        var password = this.value;
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/
        if (!reg.test(password)) {
            psw_label.innerHTML = '密码格式错误'
            flag2 = false
            return;
        } else {
            psw_label.innerHTML = '密码符合规定'
            flag2 = true
            return;
        }
    })

    var psw2 = document.querySelector('.psw2')
    var psw_label2 = document.querySelector('.psw_label2')
    psw2.addEventListener('blur', function () {
        var password2 = this.value;
        if (password2 != psw.value) {
            psw_label2.innerHTML = '密码不一致'
            flag3 = false
            return;
        } else {
            psw_label2.innerHTML = '密码一致'
            flag3 = true
            return;
        }
    })
    function judge() {
        if (username.value == "") {
            alert("用户名不能为空！");
            return false;
        }
        else if (pwd != conpwd) {
            alert("两次输入的密码不一致！");
            return false;
        }
        else
            return true;
    }

    // var check1 = document.querySelector("#chekc1")
    // var check2 = document.querySelector("#chekc2")
    // if (check1.checked) {

    // }

    $(function () {

        $('#register').on('submit', function (e) {
            e.preventDefault()
            var formdata = $('#register').serialize()
            var objdata = getQuery(formdata)
            //调用的结果：
            // username=用户名的值&password=密码的值
            //因为函数返回结果会用表单元素的name属性来表示，
            //所以使用serialize()快速获取表单数据时需要为每个表单元素设置name属性且不重复
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/reguser',
                data: objdata,
                success: function (res) {
                    console.log(res);
                    alert("注册成功！")
                    location.reload()
                }
            })
        })
    })


    $(function () {
        $('#login').on('submit', function (e) {
            e.preventDefault()
            var formdata = $('#login').serialize()
            var objdata = getQuery(formdata)
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/api/login',
                data: objdata,
                // localStorage.Authorization = token,
                // contentType: "application/json",     //导致跨域
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", localStorage.getItem("Authorization"));
                },
                success: function (res) {
                    console.log(res);
                    if (res.status === 0) {
                        console.log(res.token);
                        localStorage.setItem("Authorization", res.token);
                        location.href = "index.html";
                        alert("登录成功")
                    }

                },

            })
        })
    })

    function getQuery(formdata) {
        const obj = {};
        const arr = formdata.split('&');
        for (item of arr) {
            const keyValue = item.split('=');
            obj[keyValue[0]] = keyValue[1]
        }
        return obj;
    }
})