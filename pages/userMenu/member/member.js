import API from '../../../api/index'
var {wxToast} = getApp().globalData.common
// Component({
  // pageLifetimes: {
    // show() {
      Page({
        onLoad: function () {
          this.init()
        },
      // if (typeof this.getTabBar === 'function' &&
      //   this.getTabBar()) {
      //   this.getTabBar().setData({
      //     selected: 0
      //   })
      // }
    // }
  // },
  data: {
    pageData: [],
    status: {0: '审核中',1: '申请成功'}
  }, // 私有数据，可用于模板渲染
    init(){
      API.getFindOneUser({}).then(res => {
        this.setData({
          pageData: res.data
        })
        console.log('pageData',this.data.pageData);
      })
    },
    // 申请成为商户
    applyMember(){
      API.applyMember({}).then(res => {
        wxToast(res.msg)
      })
    },
    // 拨打电话
    callPhone(){
      wx.makePhoneCall({
        phoneNumber: '18121118073' //仅为示例，并非真实的电话号码
      })
    },
})
