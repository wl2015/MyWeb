function test() {
    $.ajax({
        url:'/user/pushMerchantInfo.do',
        type:'get',
        data:{
            state:state
        },
        success:function(res){

        }
    })
}