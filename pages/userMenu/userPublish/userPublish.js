import API from '../../../api/index'
import {beaseUrl} from '../../../request/config'
Component({
  pageLifetimes: {
    show() {
      this.init(1)
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    beaseUrl: beaseUrl,
    pageData: [],
    navTab: [{statusName: '未出租',status: 1},{statusName:'已出租',status: 2}],        
    currentTab: 1,
    // userName: '首页',
    // leftIndex: 0,
    // leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
  }, // 私有数据，可用于模板渲染
 
  methods: {
    // 点击左边菜单
    // leftMenu(e){
    //   this.setData({
    //     leftIndex: e.currentTarget.dataset.index
    //   })
    //   console.log(e);
    // },
    init(status){
      API.getUserOrderList({status}).then(res => {
        this.setData({
          pageData: res.data
        })
        // console.log('pageData',this.data.pageData[2]['Publish.volume']);
      })
    },
    // 取消订单
    cancelOrder(){
      console.log('订单取消');
    },
    // 进入详情
    toDetail(){
      wx.navigateTo({
        url: '/pages/detail/detail?id='
      })
    },
    currentTab: function (e) {
      if (this.data.currentTab == e.currentTarget.dataset.idx){
        return false;
      }
      this.setData({
        currentTab: e.currentTarget.dataset.idx
      })
      this.init(this.data.currentTab)
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
  }
})
