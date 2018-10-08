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
        console.log(info)
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
    }
  })
})