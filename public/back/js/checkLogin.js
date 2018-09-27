$(function(){
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    success: function(info) {
      if(info.error == 400) {
        location.href = 'login.html';
      }
    }
  })
})