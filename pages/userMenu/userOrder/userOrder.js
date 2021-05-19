import API from '../../../api/index'
import {beaseUrl} from '../../../request/config'
import {setDataTime} from '../../../utils/common'
var {wxToast, wxShowModal} = getApp().globalData.common
Page({
  onLoad: function () {
      console.log(111111);
      this.init(1)
  },
  data: {
    beaseUrl: beaseUrl,
    pageData: [],
    navTab: [{statusName: '进行中',status: 1},{statusName:'已完成',status: 2}],        
    currentTab: 1,
    // userName: '首页',
    // leftIndex: 0,
    // leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
  }, // 私有数据，可用于模板渲染
 
    // 点击左边菜单
    // leftMenu(e){
    //   this.setData({
    //     leftIndex: e.currentTarget.dataset.index
    //   })
    //   console.log(e);
    // },
    init(status){
      API.getUserOrderList({status}).then(res => {
       var obj =  res.data.map((item)=>{
          return {
            ...item,
            start_time: setDataTime(item.start_time),
            end_time: setDataTime(item.end_time),
          }
        })
        this.setData({
          pageData: obj
        })
      })
    },
    // 提前结束订单
    overOrder(){
      wxShowModal('操作确认', '确认提前归订单将提前结束' ,(res)=>{
        
      })
      
    },
    keepOrder(e){
      wx.navigateTo({
        url: '/pages/detail/detail?publishId=' + e.currentTarget.dataset.publishid
      })
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
})
