//index.js
//获取应用实例
import utils from '../utils/utils.js';
var app = getApp()
Page({
  data: {
    navigationBartitle:'',
    loading_src: "../../images/loading.gif",
    url: ''
  },
  onLoad: function (options) {
    // console.log('indexload')
    // utils.showModel('转发', 'options.url：' + unescape(options.url))
    if (options.url){
      this.setData({
        url: unescape(options.url)
      })
    }else{
      this.setData({
        url: app.data.api + app.data.custom
      })
    }
  },
  // 转发
  onShareAppMessage: function (res) {
    // console.log('index')
    // console.log(escape(res.webViewUrl))
    // res.webViewUrl这个属性具有偶然性，有时会获取到上一个页面的路径
    // utils.showModel('转发', '转发：' + res.webViewUrl)
    return {
      path: '/pages/index/index?url=' + escape(res.webViewUrl),
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
