// pages/login/login.js
import utils from '../utils/utils.js';
var app = getApp()
var page = {
  /**
   * 页面的初始数据
   */
  data: {
    loading_src:"../../images/loading.gif"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 登录
    this.login(); 
  },
  // 小程序登录 获取code
  login: function () {
    console.log('1.1、 小程序登录 获取code')
    wx.login({
      success: res => {
        if (!res.code) {
          utils.showModel('用户登录', '登录失败:' + res.errMsg)
          return;
        }
        //发起网络请求
        this.getUserInfo(res.code)
      }
    });
  },
  // 获取用户信息
  getUserInfo: function (code) {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        // 调用后端接口
        this.minProgramLoginJump(code, res);
      },
      fail: res => {
        // 调用客户端设置界面
        this.openSetting();
      }
    })
  },
  // 调起客户端小程序设置界面
  openSetting: function () {
    console.log('2.1、 调起客户端小程序设置界面')
    wx.showModal({
      content: '检测到您的账号未授权，请先授权。',
      showCancel: false,
      success: res => {
        console.log('用户点击确定')
        wx.openSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              console.log('2.1-true、设置授权--授权', res)
              this.login(); 
            } else {
              console.log('2.1-true、设置授权--失败', res)
              this.login();
            }
          }
        })
      }
    })
  },
  // 服务端进行相关登录操作，解密并获取用户信息返回
  minProgramLoginJump: function (code, res) {
    wx.request({
      url: app.data.api + app.data.custom + '/User/MinProgramLoginJump',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      data: {
        code: code,
        encryptedData: res.encryptedData,
        iv: res.iv
      },
      success: res2 => {
        if (res2.data.state == 200) {
          this.jump(res2)
        } else{
          console.log(res2);
          utils.showModel('用户登录', '失败:' +res2)
        }
      }
    })
  },
  // 搜权成功跳转到商城页面
  jump(res2){
    var url = escape('/User/MinProgramLoginJump2?openid=' + res2.data.data.openid);
    var fnName = '/User/MinProgramLoginJump2';
    wx.redirectTo({
      url: "/pages/view/view?url=" + url + "&fnName=" + fnName
    })
  }
};
Page(page)