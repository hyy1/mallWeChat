// pages/view/view.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    fnName: "",
    loading_src: "../../images/loading.gif"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var url = app.data.api + app.data.custom + unescape(options.url);
    var fnName = options.fnName;
    this.setData({
      url: url,
      fnName: fnName
    })
  },
  // 转发
  onShareAppMessage: function (res) {
    return {
      path: '/pages/view/view?url=' + escape(res.webViewUrl),
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})