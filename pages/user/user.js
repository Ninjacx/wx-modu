Component({
  pageLifetimes: {
    show() {
      console.log('userInfo',this.data.userInfo);
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    },
    hide () { },
    resize () { },
  },
  data: {
    isLogin: false, // 默认未登录
    userInfo: [], // 用户信息
    userName: '张三',
  }, // 私有数据，可用于模板渲染
  methods: {
    // 跳转发布页面
    public: function(){
      wx.navigateTo({
        url: '/pages/userMenu/public/public'
      })
    },
    setUserName: function(){
      this.setData({
        userName: '李四'
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    toLogin(e){
      // wx.navigateTo({
      //   url: '/pages/login/login?index='+ e.currentTarget.dataset.index
      // })
      // 直接跳转login 登录页面
    },
    // 拨打电话
    callPhone(){
      wx.makePhoneCall({
        phoneNumber: '18121118073' //仅为示例，并非真实的电话号码
      })
    },
    to_historyOrder(){
      wx.navigateTo({
        url: '/pages/userMenu/historyOrder/historyOrder'
      })
    },
    to_newUser(){
      wx.navigateTo({
        url: '/pages/userMenu/newUser/newUser'
      })
    },
    to_userOrder(){
      wx.navigateTo({
        url: '/pages/userMenu/userOrder/userOrder'
      })
    },
    // 个人资料
    to_userDoc(){
      wx.navigateTo({
        url: '/pages/userMenu/userDoc/userDoc'
      })
    }
  }
  
})
