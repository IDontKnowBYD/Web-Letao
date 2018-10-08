$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var totalPage = 0;

  //渲染
  function render(cP, pS) {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: cP,
        pageSize: pS
      },
      dataType: 'json',
      success: function (info) {

        var proTmp = template('proTmp', info);
        $('.lt_content tbody').html(proTmp);

        totalPage = Math.ceil(info.total / info.size);

        setPage(currentPage, totalPage);
      }
    })
  }
  //分页
  function setPage(cP, tP) {
    $("#paginator").bootstrapPaginator({
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

  // 打开模态框
  $('.addPro').click(function () {
    $('#addModal').modal('show');
  })
})