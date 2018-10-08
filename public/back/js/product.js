$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var totalPage = 0;

  var picArr = [];

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
      },
      //控制按钮显示的文字
      itemTexts: function (type, page, current) {
        switch (type) {
          case "page":
            return page;
          case "first":
            return "首页";
          case "last":
            return "尾页";
          case "prev":
            return "上一页";
          case "next":
            return "下一页";
        }
      },
      // 将该函数的返回值, 作为按钮的 title 提示文本
      tooltipTitles: function (type, page, current) {
        switch (type) {
          case "page":
            return "前往第" + page + "页";
          case "first":
            return "首页";
          case "last":
            return "尾页";
          case "prev":
            return "上一页";
          case "next":
            return "下一页";
        }
      },
      //使用 bootstrap 的提示框组件
      useBootstrapTooltip: true
    });
  }

  render(currentPage, pageSize);

  // 打开模态框
  $('.addPro').click(function () {
    $('#addModal').modal('show');
    //添加分类
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template("dropdownTpl", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  })

  //下拉菜单
  $('.dropdown-menu').on("click", "a", function () {
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);

    var id = $(this).data("id");
    $('[name="brandId"]').val(id);

    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  //图片上传
  $('#fileupload').fileupload({
    dataType: "json",
    done: function (e, data) {

      picArr.unshift(data.result);

      var picUrl = data.result.picAddr;

      $('#imgBox').prepend('<img src="' + picUrl + '" width="100" height="100" alt="">');

      if (picArr.length > 3) {
        $('#imgBox img:last-of-type').remove();
        picArr.pop();
      }

      if (picArr.length === 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  })

  //表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      
      invalid: 'glyphicon glyphicon-remove',   
      validating: 'glyphicon glyphicon-refresh'  
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '要求尺码为 xx-xx 的格式, 例如 32-40'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  });

  //提交上传
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();

    var paramsStr = $('#form').serialize();
    paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function (info) {
        if (info.success) {
          $('#addModal').modal("hide");

          currentPage = 1;
          render(currentPage, pageSize);
   
          $('#form').data("bootstrapValidator").resetForm(true);

          $('#dropdownTxt').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = []; 
        }
      }
    })
  });
})