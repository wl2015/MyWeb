/**
 * 内容页面公共功能
 * @author laiwei
 * @date 2016年1月28日
 */

/**
 * 改变框架高度
 */
function changeFrame() {
    var main = $(window.parent.document).find("#dataShowFrame");
    var thisheight = $(document).height() + 30;
    main.height(thisheight);

    var loading = $(window.parent.document).find("#loading");
    loading.css("display", "none");
}

/**
 * 显示错误
 *
 * @author laiwei
 * @date 2016年2月3日
 * @param domID
 */
function showError(domID) {
    var html = '<div class="alert alert-danger alert-dismissable">';
    html += ' <h4><i class="icon fa fa-ban"></i> 提示!</h4>';
    html += '没有收到数据';
    html += ' </div>';

    $("#" + domID).css("height", "auto");
    $("#" + domID).html(html);
}


function initTimeSelect(cateDOM, defaultCateValue, timeDOM) {
    var cate = $("#" + cateDOM).select2();

    /*
     * “days” or 0, “months” or 1, “years” or 2, “decades” or 3, and “centuries”
     * or 4.
     */
    var minViewMode = 1;
    var format = "yyyy-mm";
    var calendarWeeks = false;

    var timeNode = $("#" + timeDOM);

    function updateDate(timeNode, selectCate) {

        timeNode.off("changeDate");

        var endDateStr1 = "";
        var endDateStr2 = "";

        var dateStartStr = "";

        if (selectCate == "月") {
            calendarWeeks = false;
            format = "yyyy-mm";
            minViewMode = "months";
            endDateStr1 = moment().subtract(2, 'month').startOf('month')
                .format('YYYY-MM');
            endDateStr2 = moment().subtract(1, 'month').startOf('month')
                .format('YYYY-MM');
            /* 上月 */

            dateStartStr = "2013-01";

        } else if (selectCate == "周") {
            calendarWeeks = true;
            format = "yyyy-mm-dd";
            minViewMode = "days";

            var tmpLastWeekMonday = new Date(moment().subtract(1, 'day')
                .startOf('day').format('YYYY-MM-DD'));
            /* 上一天 */

            if (tmpLastWeekMonday.getDay() != 0) {
                tmpLastWeekMonday = new Date(tmpLastWeekMonday
                    - (tmpLastWeekMonday.getDay() - 1)
                    * (1000 * 60 * 60 * 24));
            } else {
                tmpLastWeekMonday = new Date(tmpLastWeekMonday - 6
                    * (1000 * 60 * 60 * 24));
            }
            tmpLastWeekMonday = new Date(tmpLastWeekMonday - 7 * 1000 * 60 * 60
                * 24);// 默认选中上一周

            var tmpLastWeekMonday12 = new Date(tmpLastWeekMonday - 12 * 7
                * 1000 * 60 * 60 * 24);// 前12周周一

            endDateStr1 += "" + tmpLastWeekMonday12.getFullYear();
            endDateStr1 += "-" + (tmpLastWeekMonday12.getMonth() + 1);
            endDateStr1 += "-" + tmpLastWeekMonday12.getDate();

            endDateStr2 += "" + tmpLastWeekMonday.getFullYear();
            endDateStr2 += "-" + (tmpLastWeekMonday.getMonth() + 1);
            endDateStr2 += "-" + tmpLastWeekMonday.getDate();

            dateStartStr = "2013-01-01";

        } else if (selectCate == "天") {
            calendarWeeks = true;
            format = "yyyy-mm-dd";
            minViewMode = "days";
            endDateStr1 = moment().subtract(30, 'day').startOf('day').format(
                'YYYY-MM-DD');
            endDateStr2 = moment().subtract(1, 'day').startOf('day').format(
                'YYYY-MM-DD');
            /* 上一天 */
            dateStartStr = "2013-01-01";
        }

        $('#' + timeDOM).each(function () {

            var endDateStr = endDateStr2;

            if ($(this).attr("name") == "startTime") {
                endDateStr = endDateStr1;
            } else {
                endDateStr = endDateStr2;
            }

            $(this).datepicker('remove');
            $(this).datepicker({
                format: format,
                calendarWeeks: calendarWeeks,
                language: "zh-CN",
                autoclose: true,
                startView: minViewMode,
                minViewMode: minViewMode,
                maxViewMode: minViewMode,
                toggleActive: false
            }).datepicker('update', endDateStr);
            $(this).datepicker('setStartDate', dateStartStr);
            $(this).datepicker('setEndDate', endDateStr);
        });

        if (selectCate == "周") {
            $('#' + timeDOM + ' > input')
                .each(
                    function () {
                        $(this).datepicker('setDaysOfWeekDisabled',
                            [0, 2, 3, 4, 5, 6]);
                        /* 限制只选择周一 */
                        $(this).datepicker("setDaysOfWeekHighlighted",
                            ["1"]);
                    });
        }
    }

    updateDate(timeNode, defaultCateValue);

    cate.change(function (e) {

        var selectCate = cate.find("option:selected").text();
        updateDate(timeNode, selectCate);

        /* timeNode.datepicker('show'); */

    });
}


/**
 * 根据时间类型选择
 */
(function ($) {
    function Select($this) {
        var jqSelectBox = $("<ul class='jqSelectBox'></ul>");
        $this.clickFun = function (e) {
            e.preventDefault();
            var w = $this.innerWidth(), h = $this.innerHeight(), str = '', data;
            if (!data) data = $this.attr("data-select") ? $this.attr("data-select").split(",") : [];
            if (!data.length) {
                return $this;
            }
            for (var i = 0, l = data.length; i < l; i++) {
                if ($this.children("span").html() == data[i]) {
                    str += '<li class="jq_selected" style="background:#00aae3;color:#fff;" data-value="' + data[i] + '" data-index="' + i + '">' + data[i] + '</li>';
                } else {
                    str += '<li data-value="' + data[i] + '" data-index="' + i + '">' + data[i] + '</li>';
                }
            }
            if ($this.css("position") == "static") $this.css("position", "relative");
            $(".jqSelectBox").each(function () {
                if (this != jqSelectBox[0]) {
                    $(this).slideUp('fast');
                }
            });
            var offsetX = (parseInt($this.css("left")) ? parseInt($this.css("left")) : 0 ) + (parseInt($this.css("marginLeft")) ? parseInt($this.css("marginLeft")) : 0 ),
                offsetY = (parseInt($this.css("top")) ? parseInt($this.css("top")) : 0 ) + (parseInt($this.css("marginTop")) ? parseInt($this.css("marginTop")) : 0 );
            jqSelectBox.html(str).css({
                top: $(this).offset().top + 31+'px',
                left: $this.position().left + offsetX-4,
                width: w
            }).appendTo("body");
            jqSelectBox.slideToggle('fast');
            jqSelectBox.children("li").on("click", function (e) {
                e.preventDefault();
                jqSelectBox.slideUp('fast');
                var idx = $(this).index() || $(this).attr("data-index"), val = $(this).attr("data-value");
                $this.children("span").html(val);
                $this.selectCallBack(idx, val);
                return false;
            });
            jqSelectBox.scrollTop(jqSelectBox.find("li.jq_selected").attr("data-index") * 30);
            return false;
        };
        $this.selectCallBack = function () {
        };
        $this.setSelectCallBack = function (fun) {
            $this.selectCallBack = fun;
        };
        $(window).off("click", hideSelectBox);
        $(window).on("click", hideSelectBox);
        return $this;
    }

    function hideSelectBox() {
        $(".jqSelectBox").slideUp('fast');
    }

    $.fn._select = function (cb) {
        this.each(function () {
            var $this = $(this), select = new Select($(this));
            $this.off("click");
            $this.on("click", select.clickFun);
            select.setSelectCallBack(cb);
            return select;
        });
        return this;
    };
})(jQuery);

//  直接数据初始化select 节点 数据 回调
function initSelect(node, data, callback, drawChart, initModel) {
    var str = '';
    initModel = initModel || data[0].name;//从哪里初始化 年 月 周
    for (var i = 0, l = data.length; i < l - 1; i++) {
        str += data[i].name + ',';
    }
    str += data[i].name;
    node.attr("data-select", str)._select(function (i, v) {
        if (callback) callback(data, i, v);
    }).children("span").html(initModel);
    if (drawChart) drawChart();
}


// 初始化，改变日期的显示方式 日 月 年； 节点 格式 最小时间单位（0 日，1 月，2 年）
function initDatePicker(node, node2, format, ViewMode, domModel) {
    node.datepicker('remove');
    node2.datepicker('remove');
    //var _date = (""+node.children("input").val()).replace(/\-/,"/");
    var dateStr = '', startDateStr = '',defaultStart='', endDateStr = '', yesterday = new Date(new Date() - 1000 * 60 * 60 * 24);
    var newDate = yesterday;
    //var newDate = _date ? new Date(_date) : yesterday;
    var minViewMode, calendarWeeks = false, forceParse = true;
    if (ViewMode == "月") {// 选月 默认上一个月
        newDate = new Date();
        minViewMode = 1;
        if (newDate.getMonth()) {
            dateStr += "" + newDate.getFullYear();
            dateStr += "-" + newDate.getMonth();
        } else if (newDate.getFullYear() > 2013) {
            dateStr += "" + (newDate.getFullYear() - 1);
            dateStr += "-12";
        } else {
            dateStr = '2013-01';
        }
        startDateStr = '2013-01';
        endDateStr += dateStr;

        if(domModel == 'justOne'){
            defaultStart = endDateStr
        }else {
            defaultStart = dateMath['月'](new Date(),-12);
        }
//        endDateStr += "-"+(yesterday.getMonth()+1);
    } else if (ViewMode == "周") {//使datepicker默认选中上一周周一
        minViewMode = 0;
        calendarWeeks = true;
        forceParse = false;
        var newDate=new Date();
//        newDate = newDate > yesterday ? newDate : yesterday;
        if (newDate.getDay() != 0) {
            newDate = new Date(newDate - (newDate.getDay() - 1) * (1000 * 60 * 60 * 24));
        } else {
            newDate = new Date(newDate - 6 * (1000 * 60 * 60 * 24));
        }
        newDate = new Date(newDate - 7 * 1000 * 60 * 60 * 24);//默认选中上一周 不知道是否需要
        dateStr += "" + newDate.getFullYear();
        dateStr += "-" + (newDate.getMonth() + 1);
        dateStr += "-" + newDate.getDate();
        startDateStr = '2013-01-01';
        endDateStr += dateStr;
        if(domModel == 'justOne'){
            defaultStart = endDateStr
        }else {
            defaultStart = dateMath['周'](new Date(),-12);
        }
        console.log(dateStr,"week");
        console.log(endDateStr,"weekend");
    } else { //if(ViewMode=="日")
        minViewMode = 0;
        dateStr += "" + newDate.getFullYear();
        dateStr += "-" + (newDate.getMonth() + 1);
        dateStr += "-" + newDate.getDate();
        startDateStr = '2013-01-01';
        endDateStr += yesterday.getFullYear();
        endDateStr += "-" + (yesterday.getMonth() + 1);
        endDateStr += "-" + yesterday.getDate();
        if(domModel == 'justOne'){
            defaultStart = endDateStr
        }else {
            defaultStart = dateMath['天'](new Date(),-12);
        }
    }
    node.off("click");
    node2.off("click");
    node.off("show");
    node2.off("show");
    var picker = node.datepicker({
        format: format,
        startView: minViewMode,
        minViewMode: minViewMode,
        language: "zh-CN",
        toggleActive: false,
        forceParse: forceParse,
        calendarWeeks: calendarWeeks
    }).datepicker('update', defaultStart);
    node.datepicker('setStartDate', startDateStr);
    node.datepicker('setEndDate', endDateStr);
   var start = new Date(picker.getDate());
    console.log('start',start);
    node.datepicker()
        .on('changeDate', function (ev) {
            start = new Date(picker.getDate())
            node2.datepicker('setStartDate', start);
        });

    var picker2 = node2.datepicker({
        format: format,
        startView: minViewMode,
        minViewMode: minViewMode,
        language: "zh-CN",
        toggleActive: false,
        forceParse: forceParse,
        calendarWeeks: calendarWeeks
    }).datepicker('update', endDateStr);
    node2.datepicker('setStartDate', start);
    node2.datepicker('setEndDate', endDateStr);


    if (ViewMode == "周") {
        node.datepicker('setDaysOfWeekDisabled', [0, 1, 2, 3, 4, 5, 6]);//限制 只选择 周
        picker.element.find("input").val(dateFormatterMap["周"](picker.viewDate))
            .attr("data-date", picker.viewDate);

        picker.picker.on("click", ".weeks", function (d) {
            //console.log(d);
            if (!$(this).hasClass("disabled")) {
                $(this).next().removeClass("disabled").trigger("click");
                picker.element.find("input").val(dateFormatterMap["周"](picker.viewDate))
                    .attr("data-date", picker.viewDate);
            }
        });
        picker.element.on("click", function () {
            picker.picker.find(".active").each(function () {
                if ($(this).hasClass("day") && $(this).hasClass("disabled")) {
                    $(this).removeClass("active").prev().addClass("active");
                }
            });
        });
        picker.element.on("show", function () {
            picker.picker.find(".active").each(function () {
                if ($(this).hasClass("day") && $(this).hasClass("disabled")) {
                    $(this).removeClass("active").prev().addClass("active");
                }
            });
            picker.element.find("input").val(dateFormatterMap["周"](picker.viewDate))
                .attr("data-date", picker.viewDate);
        });
    }
    if (ViewMode == "周") {
        node2.datepicker('setDaysOfWeekDisabled', [0, 1, 2, 3, 4, 5, 6]);//限制 只选择 周
        picker2.element.find("input").val(dateFormatterMap["周"](picker2.viewDate))
            .attr("data-date", picker2.viewDate);

        picker2.picker.on("click", ".weeks", function (d) {
            //console.log(d);
            if (!$(this).hasClass("disabled")) {
                $(this).next().removeClass("disabled").trigger("click");
                picker2.element.find("input").val(dateFormatterMap["周"](picker2.viewDate))
                    .attr("data-date", picker2.viewDate);
            }
        });
        picker2.element.on("click", function () {
            picker2.picker.find(".active").each(function () {
                if ($(this).hasClass("day") && $(this).hasClass("disabled")) {
                    $(this).removeClass("active").prev().addClass("active");
                }
            });
        });
        picker2.element.on("show", function () {
            picker2.picker.find(".active").each(function () {
                if ($(this).hasClass("day") && $(this).hasClass("disabled")) {
                    $(this).removeClass("active").prev().addClass("active");
                }
            });
            picker2.element.find("input").val(dateFormatterMap["周"](picker2.viewDate))
                .attr("data-date", picker2.viewDate);
        });
    }
}
// 把 全部 全国 改成 空
function select_transVal(val) {
    if (val == "全国" || val == "全部") {
        return "";
    } else {
        return val;
    }
}



