$(function(){

  var currentPage = 1;
  var pageSize = 5;
  var totalPage = 0;

  function render(cP, pS) {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: cP,
        pageSize: pS
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        
        var tmp = template("tmp", info);
        $('tbody').html(tmp);
        totalPage = Math.ceil(info.total / info.size);

        setPage(currentPage, totalPage);
      }
    })
  }

  function setPage(cP, tP) {
    $("#pagintor").bootstrapPaginator({
      bootstrapMajorVersion: 3,
      currentPage: cP,
      totalPages: tP,
      size: "small",
      onPageClicked: function (event, originalEvent, type, page) {
        currentPage = page;
        render(currentPage, pageSize);
      }
    });
  }

  render(currentPage, pageSize);
})