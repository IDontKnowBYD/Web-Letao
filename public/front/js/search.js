$(function () {
  
  render();
  //查看历史数据
  function getHistory() {
    var str = localStorage.getItem('search_list');
    var arr = JSON.parse(str) || [];
    return arr;
  }
  //渲染
  function render() {
    var arr = getHistory();

    var tmp = template('hisTmp', {arr: arr});
    $('.lt_history').html(tmp);
  }

  //删除全部
  $('.lt_history').on('click', '.btn_empty', function(){

    mui.confirm("你确认要清空历史记录嘛", "温馨提示", ["取消", "确认"], function (e) {
      if(e.index == 1){
        localStorage.removeItem("search_list");
        render();
      }
    })

  })

  //删除单个
  $('.lt_history').on('click', '.btn_delete', function () {
    var index = $(this).data("index");

    var arr = getHistory();
    arr.splice(index, 1);
    localStorage.setItem('search_list', JSON.stringify(arr));

    render();
  })

  //搜索
  $('.search_btn').click(function(){

    var arr = getHistory();
    var val = $('.search_input').val().trim();

    if(val == ""){
      mui.toast('请输入搜索关键字');
    }

    var index = arr.indexOf(val);
    if(index != -1){
      arr.splice(index, 1);
    }

    if(arr.length >= 10){
      arr.pop();
    }
    
    arr.unshift(val);
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();

    $('.search_input').val("");
  })
});