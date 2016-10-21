/**
 * 绘制服务端分页table
 *
 * 请求参数 {"draw":0,"start":0,"length":10,"order":[],"query":{"cate":"月"}}
 *
 * 其中query为业务查询参数，通过传入函数定义,其他参数内部封装，无需传递 quyerFunc = function query() { return {
 * cate : * $("#cateSelect").val() }; }
 *
 * @author laiwei
 * @date 2016年1月29日
 * @param tableDomID 表格承载id
 * @param btnQueryDomID 查询按钮id
 * @param columns
 *            列定义 var columns = [ { title : "商品名称", data : "goodsName" }, {
 *            title : "点击次数", data : "goodsClickCount" }, { title : "兑换次数", data :
 *            "goodsConvertCount" }, { title : "兑换比例", data : "goodsConvertRate" } ];
 * @param funcQuery
 *            查询函数，不需要分页参数function query() { return { cate : *
 *            $("#cateSelect").val() }; }
 * @param url
 *            数据接口地址
 * @param order
 *            排序，可结合后端数据实现
 * @param funcStateLoaded
 *            表格加载完事件函数 function(e, settings, data)
 */
function drawPagedTable(tableDomID, btnQueryDomID, columns, funcQuery, url,
		order, funcStateLoaded) {
	if (order == undefined || order == null) {
		order = [];
	}

	table = $('#' + tableDomID)
			.on('xhr.dt', function(e, settings, json) {

			})
			.on('stateLoaded.dt', funcStateLoaded)
			.dataTable(
					{
						pagingType : "full_numbers",
						stateSave : true,
						processing : true,
						serverSide : true,
						searching : false,
						language : {
							"sProcessing" : "<div class='overlay' ><i class='fa fa-refresh fa-spin'></i></div>",
							"sLengthMenu" : "显示 _MENU_ 项结果",
							"sZeroRecords" : "没有匹配结果",
							"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
							"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
							"sInfoFiltered" : "",
							"sInfoPostFix" : "",
							"sSearch" : "搜索:",
							"sUrl" : "",
							"sEmptyTable" : "表中数据为空",
							"sLoadingRecords" : "载入中...",
							"sInfoThousands" : ",",
							"oPaginate" : {
								"sFirst" : "首页",
								"sPrevious" : "上页",
								"sNext" : "下页",
								"sLast" : "末页"
							},
							"oAria" : {
								"sSortAscending" : ": 以升序排列此列",
								"sSortDescending" : ": 以降序排列此列"
							}
						},
						ajax : {
							url : url,
							type : "POST",
							contentType : "application/json",
							dataType : "json",
							data : function(d) {

								var order = [];
								var start = d.start;
								var length = d.length;

								if (d.order.length > 0) {
									for (i = 0; i < d.order.length; i++) {
										var column = columns[d.order[i].column].data;
										var dir = d.order[i].dir;
										var tmpOrder = {
											column : column,
											dir : dir
										};
										order.push(tmpOrder);
									}
								}

								var query = {
									draw : d.draw,
									start : start,
									length : length,
									order : order
								};
								/*var tmp = {
									query : funcQuery()
								};*/
								$.extend(query, funcQuery());
								return JSON.stringify(query);
							}
						},
						columns : columns,
						order : order
					});

	$("#"+btnQueryDomID).click(function() {
		table.fnFilter('');
	});

	return table;
}

function drawTable(tableDomID, btnQueryDomID, columns, funcQuery, url,
						order, funcStateLoaded) {
	if (order == undefined || order == null) {
		order = [];
	}

	table2 = $('#' + tableDomID)
		.on('xhr.dt', function(e, settings, json) {

		})
		.on('stateLoaded.dt', funcStateLoaded)
		.dataTable(
			{
				pagingType : "full_numbers",
				stateSave : true,
				processing : true,
				serverSide : true,
				searching : false,
				language : {
					"sProcessing" : "<div class='overlay' ><i class='fa fa-refresh fa-spin'></i></div>",
					"sLengthMenu" : "显示 _MENU_ 项结果",
					"sZeroRecords" : "没有匹配结果",
					"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
					"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
					"sInfoFiltered" : "",
					"sInfoPostFix" : "",
					"sSearch" : "搜索:",
					"sUrl" : "",
					"sEmptyTable" : "表中数据为空",
					"sLoadingRecords" : "载入中...",
					"sInfoThousands" : ",",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "上页",
						"sNext" : "下页",
						"sLast" : "末页"
					},
					"oAria" : {
						"sSortAscending" : ": 以升序排列此列",
						"sSortDescending" : ": 以降序排列此列"
					}
				},
				ajax : {
					url : url,
					type : "POST",
					contentType : "application/json",
					dataType : "json",
					data : function(d) {

						var order = [];
						var start = d.start;
						var length = d.length;
						if (d.order.length > 0) {
							for (i = 0; i < d.order.length; i++) {
								var column = columns[d.order[i].column].data;
								var dir = d.order[i].dir;
								var tmpOrder = {
									column : column,
									dir : dir
								};
								order.push(tmpOrder);
							}
						}
						var query = {
							draw : d.draw,
							start : start,
							length : length,
							order : order
						};
						/*var tmp = {
						 query : funcQuery()
						 };*/
						$.extend(query, funcQuery());
						return JSON.stringify(query);
					}
				},
				columns : columns,
				order : order
			});

	$("#"+btnQueryDomID).click(function() {
		table2.fnFilter('');
	});

	return table2;
}