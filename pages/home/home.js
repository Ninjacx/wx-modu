import API from '../../api/index'
Page({
  onLoad: function () {
    console.log(123);
      this.init()
      // if (typeof this.getTabBar === 'function' &&
      //   this.getTabBar()) {
      //   this.getTabBar().setData({
      //     selected: 0
      //   })
      // }
  },
  data: {
    bannerList: [], // 轮播图列表
    demandList: [], // 需求列表
    background: [{id:1,txt:'a'},{id: 2,txt:'b'},{id:3,txt:'c'}],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    userName: '首页',
    leftIndex: 0,
    leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
  }, // 私有数据，可用于模板渲染
  init(){
    Promise.all([API.getBanner({}).then(res => { return res }), API.getDemand({}).then(res => { return res })])
          .then(result => {
            var [bannerList, demandList] = result
            console.log('result',result);
            this.setData({
              bannerList: bannerList.data,
              demandList: demandList.data
            })
            
            // var [lease_cardA, lease_cardB] = result
            // this.data.pageData.lease_cardA = lease_cardA.data.filePathName
            // this.data.pageData.lease_cardB = lease_cardB.data.filePathName
            // API.setUserDoc(this.data.pageData).then(res=>{ 
            //   wxToast(res.msg)
            // })
          })
          .catch(err=>{
            console.log(err);
          })
  },
  onPullDownRefresh(){
      wx.stopPullDownRefresh({
        success: (res) => {
          console.log(123);
        },
      })
  },
    // 点击左边菜单
    leftMenu(e){
      this.setData({
        leftIndex: e.currentTarget.dataset.index
      })
      console.log(e);
    },
    // 进入详情
    toDetail(){
      wx.navigateTo({
        url: '/pages/detail/detail?id='
      })
    },
    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value
      })
    },
    onReachBottom: function () {
      // this.onBottom();
      console.log('123');
    },
    setUserName: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    }
})
