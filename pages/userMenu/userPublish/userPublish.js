import API from '../../../api/index'
import {beaseUrl} from '../../../request/config'
import {setDataTime} from '../../../utils/common'
var {wxShowModal} = getApp().globalData.common
Page({
 onLoad: function () {
      this.init()
  },
  data: {
    beaseUrl: beaseUrl,
    pageData: [],
    navTab: [{statusName: '审核中',status: 2}, {statusName: '未出租',status: 0},{statusName:'已出租',status: 1}],        
    currentTab: 0,
  }, 
    init(index){
      // this.setData({
      //   pageData: []
      // }) 
      API.getUserPublishDataList({typeIndex: this.data.currentTab}).then(res => {
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
    removeModels(item){
      console.log('item',item.currentTarget.dataset.pid);
      wxShowModal('是否确认删除此车型', '删除操作不可逆' ,(res)=>{
        // 确认删除
        if(res.confirm){
          // API.delPublishOne
          API.delPublishOne({pid: item.currentTarget.dataset.pid}).then(res => {
            console.log('res',res);
          })
        }
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
    // bindRegionChange: function (e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value)
    //   this.setData({
    //     region: e.detail.value
    //   })
    // },
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
