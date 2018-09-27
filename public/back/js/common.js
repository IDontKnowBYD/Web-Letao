//进度条事件
$(document).ajaxStart(function() {
  NProgress.start();
})

$(document).ajaxStop(function() {
  NProgress.done();
})