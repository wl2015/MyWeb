/**
 * 判断是否登陆 TODO:判断表单是否填写完整
 * 
 * @author laiwei
 * @date 2016年1月28日
 */
function isLogin() {
	$.get("./core/islogin", {
		"time" : new Date().getTime()
	}, function(result, status) {
		if (result.code == 0) {
			window.location.href = "./main.html";
		} else if (result.code == 403) {
			$("#error").html("用户名或密码错误");
		}
	});
}

$(function() {
	if (top.location != self.location) {
		top.location = self.location;
	}

	isLogin();
});