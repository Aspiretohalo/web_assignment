$(window).on('load', function () {

    // 导航栏变色
    var topNav = document.querySelector('.top-nav')
    var oA = document.querySelectorAll('.oa')
    var oA_lr = document.querySelectorAll('.oa-lr')
    document.addEventListener('scroll',
        function scroll() {
            if (window.pageYOffset >= 80) {
                topNav.style.transition = 'all 0.5s'
                topNav.style.backgroundColor = 'white';
                for (var i = 0; i < oA.length; i++) {
                    oA[i].className = 'oa2'
                }
                for (var j = 0; j < oA_lr.length; j++) {
                    oA_lr[j].className = 'oa-lr2'
                }
            } else if (window.pageYOffset < 80) {
                topNav.style.transition = 'all 0.5s'
                topNav.style.backgroundColor = 'transparent';
                for (var i = 0; i < oA.length; i++) {
                    oA[i].className = 'oa'
                }
                for (var j = 0; j < oA_lr.length; j++) {
                    oA_lr[j].className = 'oa-lr'
                }
            }
            $(topNav).scrollLeft($(document).scrollLeft())
        }
    )
    scroll()

    // 轮播图
    $('.autoplay').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        touchMove: false,
        arrows: true,
    });

    // 导航栏隐藏模块
    var nav_ul = document.querySelector('.nav-ul')
    var lis = nav_ul.children//得到小li
    lis[1].addEventListener('mouseover', function () {
        this.children[1].style.cssText = "visibility: visible; opacity: 1; transition: all 0.3s;";
    })
    lis[1].addEventListener('mouseleave', function () {
        this.children[1].style.cssText = "opacity: 0; transition: all 0.3s;visibility: hidden;";
    })
    var fixedAs = document.querySelectorAll('.fixed_as')
    var hideMsg = document.querySelectorAll('.hide_msg')
    console.log(fixedAs.length);
    console.log(hideMsg.length);
    for (let j = 0; j < fixedAs.length; j++) {
        fixedAs[j].addEventListener('mouseover', function () {
            hideMsg[j].style.cssText = "visibility: visible; opacity: 1; transition: all 0.3s;";
        })
        fixedAs[j].addEventListener('mouseleave', function () {
            hideMsg[j].style.cssText = "opacity: 0; transition: all 0.3s;visibility: hidden;";
        })
    }

    $(function () {
        $('.logout').on('click', function (e) {
            e.preventDefault()
            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/api/logout',
                success: function (res) {
                    if (res.status === 0) {
                        localStorage.clear();
                        // location.href = 'log_register.html'
                        location.reload();
                        alert("已退出登录")
                    }

                },
            })
        })
    })
})

