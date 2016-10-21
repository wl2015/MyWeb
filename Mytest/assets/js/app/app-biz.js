/**
 * 显示iframe
 * 
 * @author laiwei
 * @date 2015年12月25日
 * @param menu
 */
function showIframe(menu) {
	event.preventDefault();
	$('#bread-nav').html(menu.innerText);
	//changeLoading(true);
	$(".treeview-menu > li").removeClass("active");
	$(menu).parent().addClass("active");

	if (menu.href) {
		var iframe = document.getElementById("dataShowFrame");

		if (iframe) {
			try {
				iframe.src = '';
				iframe.contentWindow.document.write('');
				iframe.contentWindow.close();
				iframe.parentNode.removeChild(iframe);
				iframe = null;
				try {
					CollectGarbage && CollectGarbage();
				} catch (ex) {
				}
			} catch (ex) {
			}
		}

		var iframe = document.createElement('iframe');
		iframe.src = menu.href;
		iframe.id = "dataShowFrame";

		iframe.style.height = "80vh";
		iframe.style.width = '100%';
		iframe.style.margin = '0';
		iframe.style.padding = '0';
		//iframe.style.overflowY = 'hidden';
		iframe.style.border = 'none';

		$("#mainContainer").append(iframe);

		//setTimeout("changeLoading(false)", 5000);
	}
}

/**
 * 改变加载效果是否显示
 * 
 * @author laiwei
 * @date 2016年1月28日
 * @param isShow
 */
function changeLoading(isShow) {
	if (isShow) {
		$("#loading").css("display", "block");
	} else {
		$("#loading").css("display", "none");
	}
}

/**
 * 退出登录
 * 
 * @author laiwei
 * @date 2016年1月28日
 */
function logout() {
	if (!confirm("确定要退出登录吗?")) {
		event.preventDefault();
	}
}

/**
 * 初始化菜单
 * 
 * @author laiwei
 * @date 2016年1月28日
 */
function initMenu() {
	$
			.post(
					"./core/menu",
                    //原来的方法
					function(result, status) {
						if (result.code != 0) {
							window.location.href = "./login.html";
							return;
						}
						var menuItems = result.data;
						for (var i = 0; i < menuItems.length; i++) {
							var menuItem = menuItems[i];
							var navLi = "";
							var children = menuItem.children;
							if (children != null) {

								navLi += "<li class='treeview'>";
								navLi += "<a href='javascript:void(0)'>";
								navLi += "<i class='fa fa-files-o'></i>";
								navLi += "<span>";
								navLi += menuItem.name;
								navLi += "</span><i class='fa fa-angle-left pull-right'></i>";
								navLi += "</a>";
								navLi += "<ul class='treeview-menu'>";
								for (var j = 0; j < children.length; j++) {
									var child = children[j];
                                    if(child.children ==null)
                                    {
                                        navLi += "<li class='treeview'><a href='" + child.url
                                        + "' id='"
                                        navLi += child.id;
                                        navLi += "' onClick='return showIframe(this);'><i class='fa fa-circle-o'></i>";
                                        navLi += child.name + "</a>";
                                    }else
                                    {
                                        navLi += "<li class='treeview'>";
                                        navLi += "<a href='javascript:void(0)'>";
                                        navLi += "<i class='fa fa-files-o'></i>";
                                        navLi += "<span>";
                                        navLi += child.name;
                                        navLi += "</span><i class='fa fa-angle-left pull-right'></i>";
                                        navLi += "</a>";
                                    }
                                    navLi += "<ul class='treeview-menu'>"
                                        for(var k in child.children){
                                            var child2 = child.children[k];
                                            navLi += "<li class='tree-view'><a href='" + child2.url
                                            + "' id='"
                                            navLi += child2.id;
                                            navLi += "' onClick='return showIframe(this);'><i class='fa fa-circle-o'></i>";
                                            navLi += child2.name + "</a></li>";
                                        }

                                    navLi += "</ul>";
                                    navLi += "</li>"
								}

								navLi += "</ul>";
								navLi += "</li>";

							} else {
								navLi = "<li>";
								navLi += "<a href='"+menuItem.url+"' id='"
								navLi += menuItem.id;
								navLi += "' onClick='return showIframe(this)'>";
								navLi += "<i class='fa fa-th'></i> <span>";
								navLi += menuItem.name + "</span>";
								navLi += "</a>";
								navLi += "</li>";
							}

							$("#left-side-menu").append(navLi);
						}
					});

}

$(function() {
	/* 初始化菜单 */
	initMenu();

});
