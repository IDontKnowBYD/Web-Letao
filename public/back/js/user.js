$(function(){

  var currentPage = 1;
  var pageSize = 5;
  var totalPage = 0;

  var id;
  var isDelete;
  //渲染
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
        
        var tmp = template("tmp", info);
        $('tbody').html(tmp);
        
        totalPage = Math.ceil(info.total / info.size);

        setPage(currentPage, totalPage);
      }
    })
  }

  //分页
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


  //操作按钮
  $('.container-fluid .table tbody').on('click', '.btn', function() {
    $('#userModal').modal('show');

    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-success') ? 1 : 0;   
    
  })

  $('.userBtn').on('click', function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {
        if (info.success) {
          $('#userModal').modal("hide");
          render(currentPage, pageSize);
        }
      }
    })
  })
})