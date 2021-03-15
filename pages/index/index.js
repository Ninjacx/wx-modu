import {area, carType, motocycle_cc} from '../../utils/commonData'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    regionArray: area(true),
    regionIndex: 0,
    ccArray: motocycle_cc(true),
    ccIndex: 0,
    userName: '首页',
    leftIndex: 0,
    leftTab: carType,
    // region: ['上海市', '上海市', '浦东新区'],
  }, // 私有数据，可用于模板渲染
 
  methods: {
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
    bindRegionChange(e){
      this.setData({
        regionIndex: e.detail.value
      })
    },
    bindcc_Change(e){
      this.setData({
        ccIndex: e.detail.value
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
