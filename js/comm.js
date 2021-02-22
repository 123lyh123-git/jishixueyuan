$(document).ready(function () {
    // 点击我要报名、我要资讯按钮
    $(".enroll").hide();
    $(".go_enroll").click(function () {
        $(".enroll").show();
    })
    $("#close_enroll").click(function () {
        $(".enroll").hide();
    })
    // 走进技术学院
    var clickIndex = 0,
        hoverIndex = 0;
    $('.college_nav').eq(0).addClass('college_active').siblings().removeClass('college_active');
    $('.enterCollege').eq(0).show().siblings().hide();
    $('.college_nav').on('click', function () {
        clickIndex = $(this).index();//遍历的外层要有一个盒子包起来
        $('.college_nav').eq(clickIndex).addClass('college_active').siblings().removeClass('college_active');
        $('.enterCollege').eq(clickIndex).show().siblings().hide();
    })
    $('.college_nav').on('hover', function () {
        hoverIndex = $(this).index();//遍历的外层要有一个盒子包起来
        $('.college_nav').eq(hoverIndex).addClass('college_active').siblings().removeClass('college_active');
        $('.enterCollege').eq(hoverIndex).show().siblings().hide();
    })
    // 屏幕宽度改变操作
    function changeScreen() {
        if (window.innerWidth <= 1280) {
            changeMobileGlobalNavBar();//改变手机端全局导航条
            operateMobileContent();//操作手机端内容显示和隐藏
            var contentHeight = $('.mb_content').height(),
                headerHeight = $('.mobile_header').height();
            $('.mask').css('height', (contentHeight + headerHeight) + 'px');
            // 手机端菜单切换
            var flag = true;
            $(".mobile_header .mb_menu .list_box li").on('click', function () {
                var index = $(this).index();
                if (flag) {
                    $(".mobile_header .mb_menu .list_box li").eq(index).addClass('active');
                    var l = $(".mobile_header .mb_menu .list_box li").eq(index).children('.sub_list').find('a').length;
                    $(".mobile_header .mb_menu .list_box li").eq(index).children('.sub_list').css('height', (12 * l) + 'vw');
                    flag = false;
                } else {
                    $(".mobile_header .mb_menu .list_box li").removeClass('active');
                    $(".mobile_header .mb_menu .list_box li").children('.sub_list').css('height', '0vw');
                    flag = true;
                }
            })
            // 手机端子菜单圆点
            $(".sub_list a").click(function () {
                var i = $(this).index();
                $('.sub_list a').children('style').remove();
                $(".sub_list a").eq(i).append("<style>.mobile_header .mb_menu .list_box li .sub_list a:nth-child(" + (i + 1) + ")::before{border: 1vw solid #ea5822;background: #ea5822;}</style>");
            })
            // 显示按钮
            $('.show-btn').show();
            $('.show-btn').click(function () {
              
                $('.show-btn').hide();
                $(".close-btn").css('display', 'block');
                $('.close_box').css('visibility', 'visible');
                $('.mobile_header .mb_menu').animate({
                    right: '0vw'
                });
                // 入场的动画
                $(".list_box").addClass("wow slideInRight animated");
                $(".list_box").attr("style", "visibility: visible; animation-name: slideInRight;");
                $(".mb_search").addClass("wow slideInRight animated");
                $(".mb_search").attr("style", "visibility: visible; animation-name: slideInRight;");
                $('.mask').css('display', 'block')
            })
            // 关闭按钮
            $('.close_box').click(function () {
                $('.mask').hide();
                $('.show-btn').show();
                $(".close-btn").css('display', 'none');
                $('.close_box').css('visibility', 'hidden');
                $('.mobile_header .mb_menu').animate({
                    right: '-100vw'
                })
            })
            // 点击遮罩层
            $('.mask').click(function () {
                $('.mask').hide();
                $('.show-btn').show();
                $(".close-btn").css('display', 'none');
                $('.close_box').css('visibility', 'hidden');
                $('.mobile_header .mb_menu').animate({
                    right: '-100vw'
                })
            })
            // 宣传片按钮
            $(".video_img").on('click', function () {
                $(".mb_video").show();
            })
        } else {
            changePcGlobalNavBar();//改变pc端全局导航条
            operatePcContent();//操作pc端内容显示和隐藏
            // 改变联系背景的高度
            var height = ($(document.body).height() / 2) - 78;
            $(".contact_bg").css("height", height + "px");
            // 头部搜索搜索
            $(".search").click(function () {
                $(".search_slide").css("top", "0px");
            })
            $(".close").click(function () {
                $(".search_slide").css("top", "-77px");
            })
            // 二级菜单
            $(".nav_list li").hover(function () {
                var height = $(this).children(".nav_subitem").find("a").length * 55;
                $(this).children(".nav_subitem").css('height', height + 'px');
            }, function () {
                $(this).children(".nav_subitem").css('height', '0px')
            })
            // 导航条吸顶
            $(window).on("scroll", function () {
                //判断向下滑动的距离
                if ($(window).scrollTop() >= 350) {
                    //将顶部导航栏固定
                    $(".site_box").show();
                    $(".gl_navbar").addClass("fixed");
                } else {
                    $(".site_box").hide();
                    $(".gl_navbar").removeClass("fixed");
                }
            });
            // 教师风采
            $('.show_teacher').each(function (index, item) {
                var index = index;
                $(item).attr('teacher', index);
            })
            if ($('.show_teacher').attr('teacher') == 0) {
                $('.show_info').hide();
                $('.show_info').eq(0).show();
            }
            $('.show_teacher').on('click', function () {
                var val = $(this).attr('teacher');
                $('.show_info').hide();
                $('.show_info').eq(val).show();
            })
            $('.show_teacher').on('hover', function () {
                var val = $(this).attr('teacher');
                $('.show_info').hide();
                $('.show_info').eq(val).show();
                $('.show_info').css('z-index', '23')
            })

        }
    }
    function changeMobileGlobalNavBar() {
        var len = $(".navbar").length,
            res = 100 / len;
        $('.gl_navbar ul li').css('width', res + '%');  //平分宽度
        $('.gl_navbar ul li').append("<style>.gl_navbar ul li::before{top: 5vw;left:" + (res - 1) + "vw}</style>") //改变“|”的位置
        $(".gl_navbar ul li a").each(function (index, item) {
            var index = index;
            $(item).attr('index', index); //自定义属性 index
            if ($(item).attr('id') != undefined) {
                var name = $(item).attr('id'); //获取自定义属性 id
                $(".gl_navbar ul li #" + name).css('borderBottom', 'none!important');
                $(".gl_navbar ul li #" + name).append("<style>.gl_navbar ul li #" + name + "::after{content:'';display:block;width:10vw;height:1vw;background-color:rgb(89, 121, 189);position:relative;bottom:3px;margin: 0px auto;}</style>");
                $(".navbar").on('click', function () {
                    $(".gl_navbar ul li a").eq(index).append("<style>.gl_navbar ul li #" + name + "::before{}</style>");
                    $(".gl_navbar ul li a").eq(index).append("<style>.gl_navbar ul li #" + name + "::before{content:'';display:'block';width:'10vw';height:'1vw';backgroundColor:'rgb(89, 121, 189)';margin:'0px auto';}</style>");
                })
            }
        })
    }
    function changePcGlobalNavBar() {
        $('.gl_navbar ul li').children('style').remove();
        $(".gl_navbar ul li a").children().remove(); //清除手机端追加的style
        $('.gl_navbar ul li').css('width', 'auto');
        $(".gl_navbar ul li a").each(function (index, item) {
            var index = index;
            $(item).attr('index', index); //自定义属性 index
            if ($(item).attr('id') != undefined) {
                var name = $(item).attr('id'), //获取自定义属性 id
                    mouseoverIndex,
                    mouseoutIndex;
                $(".gl_navbar ul li #" + name).css('borderBottom', '3px solid #5979bd');
                $(".navbar").mouseover(function () {
                    // 获取当前的属性index
                    mouseoverIndex = $(this).attr('index');
                    $(".gl_navbar ul li a").eq(mouseoverIndex).css('borderBottom', '3px solid #5979bd');
                }).mouseout(function () {
                    mouseoutIndex = $(this).attr('index');
                    // 判断 鼠标移出时与点击的索引是否一致
                    if (mouseoutIndex == index) {
                        return;
                    } else {
                        $(".gl_navbar ul li a").eq(mouseoutIndex).css('borderBottom', 'none');
                    }
                    $(".gl_navbar ul li a").eq(mouseoutIndex).css('borderBottom', 'none');
                })
            }
        })
    }
    function operateMobileContent() {
        // Index
        $(".mobile_header").show();
        $(".header").hide();

        $(".mb_content").show();
        $(".pc_content").hide();

        $("#rightMenu").hide();
        $(".mb_video").hide();
        // 学生热线
        $(".mb_date").css('display', 'block');
        $('.hotline .item .item_box').hide();

        // 我要培训
        $(".hide_train_more").show();
        $(".overview_bottom").show();//充当高度
        $(".mb_contact").show();
        $(".train_contact").hide();
        var img_box_h = $(".train .course .img_box").height(),
            title_h = $(".mb_course .item .title").height();
        $(".mb_course .item .title").css('top', img_box_h - title_h + 'px');
        // 资质荣誉
        $(".mb_honors").css('display', 'block');
        $(".honors").css('display', 'none');
        $(".honors_box .item_box").css('visibility', 'hidden');

        // 学生发展
        $('.mb_info').show(); //我要资讯
        $(".mb_tearcher").show();
        $(".mb_contact").show();
        $('.show_info').show(); //教师风采描述

        // 全局标题
        $('.txt_box .mb_sub_title').show();
        $('.txt_box .pc_sub_title').hide();

        $('.txt_box .mb_banner_title').show();//大标题
        $('.txt_box .pc_title').hide();

        $('.welcome_mb_subtitle').show();
        $('.welcome_pc_sutitle').hide();

        $(".mb_subtitle").show();// 学校简介-办学理念-手机端追加子标题

        // 文章详情
        $(".mb_nav").css('visibility', 'visible');//手机端底部左右按钮

        // 全局导航
        $(".gl_navbar ul li a").css('borderBottom', 'none');
        $(".gl_navbar ul li a").unbind('mouseover').unbind('mouseout');
    }
    function operatePcContent() {
        // Index
        $(".header").show();
        $(".mobile_header").hide();

        $(".pc_content").show();
        $(".mb_content").hide();

        $("#rightMenu").show();
        $('.mask').hide();
        // 全局标题
        $('.txt_box .pc_sub_title').show();
        $('.txt_box .mb_sub_title').hide();

        $('.txt_box .pc_title').show();
        $('.txt_box .mb_banner_title').hide();//大标题

        $('.welcome_pc_sutitle').show();
        $('.welcome_mb_subtitle').hide();

        $(".mb_subtitle").hide(); // 学校简介-办学理念-手机端追加子标题

        // 资质荣誉
        $(".honors").css('display', 'block');
        $(".honors_box .item_box").css('visibility', 'visible');
        $(".mb_honors").css('display', 'none');

        // 我要培训
        $(".train_contact").show();
        $(".hide_train_more").hide();
        $(".overview_bottom").hide();
        $(".mb_contact").hide();

        // 学生热线
        $('.hotline .item .item_box').show();
        $(".mb_date").css('display', 'none');//日期盒子

        // 学生发展
        $('.mb_info').hide();//我要资讯
        $(".mb_tearcher").hide();
        $(".mb_contact").hide();

        // 文章详情
        $(".site_box").hide();
        $(".mb_nav").css('visibility', 'hidden');//手机端底部左右按钮
    }
    changeScreen();
    $(window).resize(function () {
        changeScreen();
    });
});