// pages/contact/contact.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rebackUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      rebackUrl: options.sourceUrl
    })
  },
  redirectToProInfo: function () {
    var url = escape(this.data.rebackUrl);
    var fnName = this.data.rebackUrl;
    wx.redirectTo({
      url: "/pages/view/view?url=" + url + "&fnName=" + fnName
    })
  },
  // 转发
  onShareAppMessage: function (res) {
    return {
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})