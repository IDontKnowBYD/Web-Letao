$(function () {

  function render() {
    setTimeout(function () {
      $.ajax({
        type: "get",
        url: "/cart/queryCart",
        dataType: "json",
        success: function (info) {
          console.log(info);
          if (info.error === 400) {
            location.href = "login.html?retUrl=" + location.href;
            return;
          }

          var htmlStr = template("cartTpl", { arr: info });
          $('.lt_main .mui-table-view').html(htmlStr);

          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
        }
      });
    }, 500);
  }

  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true, 
        callback: function () {
          console.log("发送ajax请求, 进行页面刷新");
          render();
        }
      }
    }
  });
})