function drawBarOrLine(node, title, data, colorList, types, labels, theme,yAxisIndex,toolTipData) {

    $(node).css("height", "400px");

    var type = "bar";
    var myChart = echarts.init(node, theme ? theme : "");
    var option = {
        title : {
            text : title,
            x:'left',
            y:'top',
            textStyle: {
                color: '#333',
                fontStyle: 'normal',
                fontWeight: 700,
                //fontFamily: 'sans-serif',
                fontSize: 16
            }
        },
        tooltip : {
            trigger : 'axis',
            axisPointer : {
                type : type == 'bar' ? 'shadow' : 'line',
                shadowStyle : {
                    color : 'rgba(150,150,150,0.3)',
                    width : 'auto',
                    type : 'default'
                }
            },
            formatter : function(params,ticket,callback) {
                var str = '';
                var colonIndex = ticket.lastIndexOf("_");
                var index = Number(ticket.substring(colonIndex + 1));
                str += params[0].name + "";
                if (labels.x) {
                    str += labels.x.unit;
                }
                for (var i = 0, l = params.length; i < l; i++) {
                    str += "<br/>" + params[i].seriesName + "：";
                    str += params[i].data + "" + labels.unit[i];
                }
                if(toolTipData){
                    str += "<br/>" + toolTipData.itemName + "：";
                    str += toolTipData.itemCount[index] + "" + "次";
                }
                return str;
            }
        },
        legend : {
            data : [],
            selected : {},
            x : "center",
            y : 5,
            textStyle : {
                color : "#333",
                fontWeight : "bold"
            }
        },
        calculable : false,

        grid: {
            show: false,
            zlevel: 0,
            z: 2,
            left: "8%",
            top: 60,
            right: '8%',
            bottom: 60
        },

        xAxis : [{
            type : 'category',
            axisLabel : {
                show : true,
                //interval : 0,   //这里横坐标坐标轴标记可压缩显示
                //rotate : limitNumAndRotate(data.timeList,10,20),
                textStyle : {
                    color : '#333'
                },
                formatter : function(v) {
                    if (labels.x) {
                        return v + labels.x.unit;
                        if(labels.x.q){
                            return labels.x.q+v + labels.x.unit;
                        }
                    } else {
                        return v;
                    }
                }
            },
            data : data.timeList
        }],
        yAxis : [],
        /*dataZoom: [{				//图标缩放
         type: 'inside',
         start: 0,
         end: 30
         }, {
         start: 0,
         end: 10
         }],*/
        series : []
    };
//
    for (var i = 0, l = labels.y.length; i < l; i++) {
        if (l >= 1) {
            option.yAxis.push({
                type : 'value',
                name : labels.y[i].name,
                axisLabel : {
                    formatter : '{value}' + labels.y[i].unit,
                    show : true,
                    interval : 1
                }
            });
        }
    }

    var lineYIndex = 0;/* 折线图Y */
    var $w = $(node).width();
    for (var i = 0, l = data.itemData.length; i < l; i++) {
        if (l > 0) {
            if (types[i] == "bar") {
                option.legend.data.push(data.itemData[i].itemName);
                option.series.push({
                    name : data.itemData[i].itemName,
                    type : "bar",
                    itemStyle : {
                        normal : {
                            color : colorList[i]
                        }
                    },
                    data : data.itemData[i].itemCount
                });
            } else if (types[i] == "line") {
                lineYIndex++;
                option.legend.data.push(data.itemData[i].itemName);
                option.series.push({
                    name : data.itemData[i].itemName,
                    type : 'line',
                    yAxisIndex : yAxisIndex,     //1,
                    smooth : true,
                    symbolSize : 0.2,
                    itemStyle : {
                        normal : {
                            color : colorList[i]
                        }
                    },
                    data : data.itemData[i].itemCount
                });
                /*option.yAxis.push({
                 min:'dataMin'+10000,
                 max:'dataMax'+10000
                 });*/
            }
        }
    }



    // 为echarts对象加载数据
    myChart.setOption(option, true);
    $(window).on("resize", function() {
        myChart.resize();
    });
}
