$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var totalPage = 0;

  //渲染
  function render(cP, pS) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: cP,
        pageSize: pS
      },
      dataType: 'json',
      success: function (info) {
        
        var secTmp = template('secTmp', info);
        $('.lt-content tbody').html(secTmp);

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
  $('.addCate').click(function () {
    $('#addModal').modal('show');

    //下拉框渲染
    $.ajax({
      type: 'get',
      url: '/category/querytopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {

        var dropTmp = template('dropTmp', info);
        $('.dropdown-menu').html(dropTmp);

        totalPage = Math.ceil(info.total / info.size);

        setPage(currentPage, totalPage);
      }
    })
  });

  //选择分类
  $(".dropdown-menu").on('click', 'a', function () {

    var txt = $(this).text()
    $("#dropdownTxt").text(txt);

    var id = $(this).data("id");
    console.log(id);
    
    $('[name = "categoryId"]').val(id);

    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //上传图片
  $("#fileupload").fileupload({
    dataType: "json",

    done: function (e, data) {
      var url = data.result.picAddr;

      $('.modal-body img').attr('src', url)

      $('[name = "brandLogo"]').val(url);

      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }

    
  });

  //校验
  $("#form").bootstrapValidator({
    excluded: [],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  
    },

    // 配置校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });

  //添加二级分类
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        if (info.success) {

          $('#addModal').modal('hide');

          currentPage = 1;
          render(currentPage, pageSize);

          $('#form').data("bootstrapValidator").resetForm(true);

          $('#dropdownTxt').text("请选择一级分类");
          $('.modal-body img').attr("src", "images/none.png");
        }
      }
    })
  })

})