var Question = {
    init: function () {
        Common.msg();// 提示错误信息
        Common.vueInit(["timer", "price", "assets"], {lists: [],skyNum:[]});
        Question.list();
        Question.faq();
        Question.sign();
    },
    list: function () {
        if (!(_.isEmpty(Question.getUrl("code")) || _.isUndefined(Question.getUrl("code")))) {
            $.get(Common.getUrl('/question/code'), {id: Question.getUrl("code")}, function (data) {
                if (Tools.isResult(data)) {
                    $("#tip").text(Common.i18n[data]);
                    $("#tip1").text(Common.i18n[data]);
                } else {
                    Common.showError(data.message);
                }
            });
            Question.page.init(Question.getUrl("code"));
        } else if (!(_.isEmpty(Question.getUrl("title")) || _.isUndefined(Question.getUrl("title")))) {
            $("#key").val(Question.getUrl("title"));
            Question.page.init("", Question.getUrl("title"));
        } else {

        }
    },
    faq:function () {
        // if (!(_.isEmpty(Question.getUrl("faq")) || _.isUndefined(Question.getUrl("faq")))) {
            $.get(Common.getUrl("/question/faq"), {language: Question.getUrl("language")}, function (data) {
                if (Tools.isResult(data)) {
                    Common.vueVm.skyNum= data;
                }
            })
        // }
    },
    sign:function () {
        $.get(Common.getUrl('./active/sign'),function (data) {
        })
    },
    solve: function (id, isSolved) {
        $.post(Common.getUrl('/question/resolve'), {
            id: id,
            state: isSolved
        }, function (data) {
            if (Tools.isResult(data)) {
                Common.showSuccess(Common.i18n['意见反馈成功']);
            } else {
                Common.showError(data.message);
            }
        });
    },
    search: function () {
        var title = $("#key").val();
        if(title){
            window.location = '/question/list?title=' + title;
        }
    },
    page: {
        init: function (type, title) {
            Question.page.params.type = type;
            Question.page.params.title = title;
            $(".pagination").pagination({
                items: 0,
                itemsOnPage: Question.page.params.size,
                hrefTextPrefix: '#',
                prevText: "<<",
                nextText: ">>",
                onPageClick: function (page) {
                    Question.page.queryPage(page);
                }
            });
            $(".pagination").pagination('selectPage', 1); // 设置显示的页数
        },
        params: {
            size: 10,
            type: "",
            title: ""
        },
        queryPage: function (pageNumber) {
            $(".recordLoad").removeClass('hide');// 显示加载进度
            $(".noRecord").addClass('hide');// 隐藏加载中
            $("#questionList").addClass('hide');// 隐藏记录框
            $(".pagination").addClass('hide');// 隐藏记录框
            var params = {
                page: pageNumber - 1
            };
            params = $.extend({}, params, Question.page.params);
            $.post(Common.getUrl("/question/page"), params, function (data) {
                if (Tools.isResult(data)) {
                    if (!_.isUndefined(data.content.length) && data.content.length > 0) {
                        $("#questionList").removeClass('hide');// 显示记录框
                        $(".pagination").removeClass('hide');// 隐藏记录框
                        $(".recordLoad").addClass('hide'); // 隐藏加载中
                        $(".pagination").pagination('updateItems', data.totalElements); // 更新页数
                        Common.vueVm.lists = data.content;// 更新数据
                    } else {
                        $(".noRecord").removeClass('hide');// 无记录
                        $(".recordLoad").addClass('hide');// 隐藏加载中
                    }
                } else {
                    Common.showError(data.message);
                    $(".noRecord").removeClass('hide');// 无记录
                    $(".recordLoad").addClass('hide');// 隐藏加载中
                }
            });
        }
    },
    getUrl: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    changeUrl: function (code) {
        window.location.search = '?code=' + code;
    },
    changePageUrl: function (code) {
        window.location = '/question/list?code=' + code;

    }
};


