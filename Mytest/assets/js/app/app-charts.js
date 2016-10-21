/**
 * 绘制echarts柱状和折线图
 * 
 * @author laiwei
 * @date 2016年2月2日
 * @param node
 * @param title
 *            图标题
 * @param data
 *            数据
 * @param colorList
 *            颜色
 * @param types
 *            类型集合，对应于不同的数据结果，可选[bar,line]
 * @param labels
 *            标签 {x:{unit:"周"}, y:[{name:"使用时长(小时)",unit:""}], unit:["小时"] }
 *            x:x轴信息 y：y轴标题和单位 unit:tooltip提示单位
 * @param theme
 *            主题
 * @param yAxisIndex
 *            line折线图y轴在图表中的位置，0左1右，引用为柱状折线混合图时设置为"1"
 * @param toolTipData
 *            单个数据tooltip展示
 */
function drawBarOrLine(node, title, data, colorList, types, labels, theme,yAxisIndex,toolTipData) {

	$(node).css("height", "400px");

	var type = "bar";
	var myChart = echarts.init(node, theme ? theme : "");
	var option = {
		title : {
			text : title,
            x:'right',
            y:'top'
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
//                console.log(ticket);
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
			/* x : 'right', */
			y : 'top',
			textStyle : {
				color : "#333",
				fontWeight : "bold"
			}
		},
		calculable : false,
		xAxis : [ {
			type : 'category',
			axisLabel : {
				show : true,
				interval : 0,
				rotate : limitNumAndRotate(data.timeList,10,15),
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
		} ],
		yAxis : [],
       /* dataZoom: {              //图标缩放
            type: 'inside',
            start: 60,
            end: 80
        },*/
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
					itemStyle : {
						normal : {
							color : colorList[i]
						}
					},
					data : data.itemData[i].itemCount
				});
			}
		}
	}

	// 为echarts对象加载数据
	myChart.setOption(option, true);
	$(window).on("resize", function() {
		myChart.resize();
	});
}

// 颜色转化
function transformer(color, op) {
	var splitArr = [], tempColor, map = {
		0 : 0,
		1 : 1,
		2 : 2,
		3 : 3,
		4 : 4,
		5 : 5,
		6 : 6,
		7 : 7,
		8 : 8,
		9 : 9,
		a : 10,
		b : 11,
		c : 12,
		d : 13,
		e : 14,
		f : 15,
		A : 10,
		B : 11,
		C : 12,
		D : 13,
		E : 14,
		F : 15
	};
	if (/(rgb){1}/.test(color)) {
		if (/(rgba){1}/.test(color)) {// 有透明度
			splitArr = (color.split("("))[1].split(",");
			// tempColor =
			// 'rgba('+(+splitArr[0])+','+(+splitArr[1])+','+(+splitArr[2])+','+(+splitArr[3])+')';
			tempColor = 'rgba(' + (+splitArr[0]) + ',' + (+splitArr[1]) + ','
					+ parseInt(splitArr[2]) + ',' + op + ')';
		} else {// 无透明度
			splitArr = (color.split("("))[1].split(",");
			tempColor = 'rgba(' + (+splitArr[0]) + ',' + (+splitArr[1]) + ','
					+ parseInt(splitArr[2]) + ',' + op + ')';
		}
	} else if (/#{1}/.test(color)) {
		color = color.replace("#", "");
		if (color.length == 6) {
			tempColor = 'rgba(' + (map[(color[0])] * 16 + map[(color[1])])
					+ ',' + (map[(color[2])] * 16 + map[(color[3])]) + ','
					+ (map[(color[4])] * 16 + map[(color[5])]) + ',' + op + ')';
		} else if (color.length == 3) {
			tempColor = 'rgba(' + (map[(color[0])] * 16 + map[(color[0])])
					+ ',' + (map[(color[1])] * 16 + map[(color[1])]) + ','
					+ (map[(color[2])] * 16 + map[(color[2])]) + ',' + op + ')';
		}
	}
	return tempColor;
}
// 超过一定数目 X轴标签旋转
function limitNumAndRotate(list, num, ang) {
	num = num || 14;
	ang = ang || 45;
	if (list.length >= num) {
		return ang;
	} else {
		return 0;
	}
}