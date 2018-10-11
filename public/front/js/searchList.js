


$(function () {

  //搜索框文字
  $('.search_input').val(getSearch('key'));

  //一进页面，点击搜索键进行渲染
  render();

  function render() {
    $('.lt_product ul').html('<div class="box"></div>');

    var params = {};
    params.proName = $('.search_input').val();  
    params.page = 1;
    
    params.pageSize = 100;

    if($('.current').length > 0) {
      var key = $('.current').data('type');
      console.log(key);
      var val = $('.current').find('i').hasClass("fa-angle-down") ? 2 : 1;
      params[key] = val;
    }

    setTimeout(() => {
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        dataType: 'json',
        data: params,
        success: function (info) {
          console.log(info);

          var str = template('proTmp', info);
          $('.lt_product ul').html(str);
        }
      })
    }, 1000);
  }

  $('.search_btn').click(function(){
    render();
  })

  //点击切换顺序
  $('.lt_sort a[data-type]').click(function(){
    //排异
    if( $(this).hasClass('current')){
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }else{
      $(this).addClass('current').siblings().removeClass('current');
    }

    render();
  })
})