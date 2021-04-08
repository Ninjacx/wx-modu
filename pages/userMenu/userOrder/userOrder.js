import API from '../../../api/index'
Component({
  pageLifetimes: {
    show() {

      API.getUserOrderList({}).then(res => {
        this.setData({
          pageData: res.data
        })
        console.log('pageData',this.data.pageData);
      })

      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    pageData: [],
    navTab: ['进行中', '已完成'],        
    // currentTab: 0,
    // userName: '首页',
    // leftIndex: 0,
    // leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
  }, // 私有数据，可用于模板渲染
 
  methods: {
    // 点击左边菜单
    leftMenu(e){
      this.setData({
        leftIndex: e.currentTarget.dataset.index
      })
      console.log(e);
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
        return;
      }
      // console.log('e.currentTarget.dataset.idx',e.currentTarget.dataset.idx);
      if (e.currentTarget.dataset.idx === 0) {
        // 请求进行中接口
        console.log(0);
      }else if (e.currentTarget.dataset.idx === 1) {
        // 请求已完成订单
        console.log(1)
      }
      this.setData({
        currentTab: e.currentTarget.dataset.idx
      })
      this.select={
        page: 1,
        size: 6,
        isEnd: false
      }
      this.data.sendList=[];
      // this.getData()
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
