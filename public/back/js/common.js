//进度条事件
$(document).ajaxStart(function() {
  NProgress.start();
})

$(document).ajaxStop(function() {
  setTimeout(function () {
    NProgress.done();
  }, 500);
})

$(function(){
  // 侧边栏分类
  $('.category').click(function(){
    $('.lt_aside .nav .child').slideToggle();
  })

  //侧边栏收缩
  $('.icon_menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt-topbar').toggleClass('hidemenu');
  })

  //退出按钮设置模态框
  $('.icon_logout').click(function(){
    $('#logoutModal').modal('show')
  })

  $('.logoutBtn').click(function(){
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function(info) {
        if(info.success) {
          location.href = 'login.html';
        }
      }
    })
  })
})

