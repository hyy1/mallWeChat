// pages/pay/pay.js
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("小程序支付操作");
    // console.log(options);
    var url = "/MinProgram/PayConfirm?orderID=" + options.orderID;
    var fnName = "/MinProgram/PayConfirm";
    wx.requestPayment({
      "appId": options.appId,
      "timeStamp": options.timeStamp,
      "nonceStr": options.nonceStr,
      "package": 'prepay_id=' + options.prepayId,
      "signType": options.signType,
      "paySign": options.paySign,
      "complete": function (res) {
        // console.log("小程序支付成功：");
        // console.log(res);
        wx.showToast({
          title: '支付成功',
          icon:'success',
          complete: function () {
            url = escape(url + "&resultCode=SUCCESS");
            wx.redirectTo({
              url: "/pages/view/view?url=" + url + "&fnName=" + fnName
            })
          }
        })
      },
      'fail': function (res) {
        // console.log("小程序支付失败：");
        // console.log(res);
        wx.showModal({
          title:'支付失败',
          content : res.errMsg,
          complete:function(){
            url = escape(url + "&resultCode=FAIL");
            wx.redirectTo({
              url: "/pages/view/view?url=" + url + "&fnName=" + fnName
            })
          }
        });
      }
    })
  }
})