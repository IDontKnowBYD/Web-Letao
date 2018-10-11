//滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
});

//轮播
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
});

//获取地址信息
function getSearch( keyword ){

  var search = location.search;
  search = decodeURI(search);
  search = search.slice(1);

  var arr = search.split('&');
  var obj = {};
  arr.forEach(function(e, i){
    var key = e.split('=')[0];
    var val = e.split('=')[1];

    obj[key] = val;
  })

  return obj[keyword];
}