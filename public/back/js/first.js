$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var totalPage = 0;

  //渲染
  function render(cP, pS) {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: cP,
        pageSize: pS
      },
      dataType: 'json',
      success: function( info ) {
        var firTmp = template('firTmp', info);
        $('.lt-content tbody').html(firTmp);

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

  //打开模态框
  $('.addCate').click(function(){
    $('#addModal').modal('show');
  });

  //校验
  $('#form').bootstrapValidator({
    // 校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })

  //添加分类 
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {
          $('#addModal').modal('hide');

          currentPage = 1;
          render(currentPage, pageSize);
        }
      }
    })
  })
})