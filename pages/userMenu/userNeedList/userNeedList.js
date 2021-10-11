import API from '../../../api/index'
import {beaseUrl} from '../../../request/config'
var app = getApp();  //获取app.js
Page({
  onLoad: function () {
    this.initDataList()
  },
    data: {
      initData: [],
      isMore: true, // 是否有更多数据
      beaseUrl: beaseUrl,
      pageSize: 1
    },
    // 页码初始化为1 ，并且可以开启再次下拉
    setInit(){
      this.data.isMore = true
      this.data.pageSize = 1
    },
    onPullDownRefresh(){
        wx.stopPullDownRefresh({
          success: (res) => {
            this.setInit()
            this.initDataList()
          },
          fail: (res) => {
            console.log(res);
          }
        })
    },
    // 列表
    initDataList(){
      if(!this.data.isMore){
        return false
      }
      API.getUserDemand({pageSize: this.data.pageSize}).then(res => {
        if(!res.data.length){
          this.setData({
            isMore: false
          })
          return false
        }
        if(this.data.pageSize === 1){
          this.setData({
            initData: res.data
          })
        }else{
          var appendData = this.data.initData.concat(res.data)
          this.setData({
            initData: appendData
          })
        }
       
      })
    },
    onReachBottom: function () {
      this.data.pageSize += 1
      this.initDataList()
    }
})
