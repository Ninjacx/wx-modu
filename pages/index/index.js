import API from '../../api/index'
import {area, carType, motocycle_cc} from '../../utils/commonData'

var app = getApp();  //获取app.js
Page({
  onLoad: function () {
    this.init()
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //     this.getTabBar().setData({
    //       selected: 0
    //     })
    // }
  },
  data: {
    regionArray: area(true),
    regionIndex: 0,
    ccArray: motocycle_cc(true),
    ccIndex: 0,
    userName: '首页',
    leftIndex: 0,
    leftTabArray: [],
    rightArray: [],
    // region: ['上海市', '上海市', '浦东新区'],
  },
    init(){
      // console.log(123);
      API.getType({}).then(res => {
        this.setData({
          leftTabArray: res.data
        })
        this.leftMenu(0)
        console.log(res.data);
        // return res
      })
    },
    // 点击左边菜单
    leftMenu(e){
      if(e !== 0){
        this.setData({leftIndex: e.currentTarget.dataset.index})
      }
      var { id } = this.data.leftTabArray[this.data.leftIndex]
      API.publishDataList({typeId: id}).then(res => {
        this.setData({
          rightArray: res.data
        })
      })

     
      console.log(e);
    },
    // 进入详情
    toDetail(e){
      wx.navigateTo({
        url: '/pages/detail/detail?publishId=' + e.currentTarget.dataset.leftdata.id
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
})
