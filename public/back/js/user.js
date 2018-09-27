$(function(){
  $.ajax({
    type: 'get',
    url: '/user/queryUser',
    data: {
      page: 1,
      pageSize: 5
    },
    dataType: 'json',
    success: function(info) {
      var tmp = template("tmp", info);
      $('tbody').html( tmp );
    }
  })
})