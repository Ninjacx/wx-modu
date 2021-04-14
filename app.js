import common from './utils/global'
App({
  onLaunch: function () { 
    this.globalData.common = common
    // wx.setStorageSync('userInfo')
    // this.globalData.userInfo = wx.getStorageSync('userInfo') || ''
  },
  globalData: {
    common: common,
    userInfo: "",
  }
})
