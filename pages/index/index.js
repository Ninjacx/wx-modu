import API from '../../api/index'
import {beaseUrl} from '../../request/config'
import {area, carType, motocycle_cc} from '../../utils/commonData'

var app = getApp();  //获取app.js
Page({
  onLoad: function () {
    this.initLeftMenu()
  },
    data: {
      // <view>价格由低到高</view>
      //   <view>价格由高到低</view>
      //   <view>押金最少</view>
      //   <view>押金最多</view>
      //   <view>排量由小到大</view>
      //   <view>排量由大到小</view>
      searchList:[{name: '综合排序'},{name: '价格由低到高'}, {name: '价格由高到低'}, {name: '押金最少'}, {name: '押金最多'}, {name: '排量由小到大'}, {name: '排量由大到小'}],
      isShowSearchBlock: false,
      searchIndex: 0,
      isMore: true, // 是否有更多数据
      // isMoreTxt: '加载更多…',
      beaseUrl: beaseUrl,
      regionArray: area(true),
      regionIndex: 0,
      ccArray: motocycle_cc(true),
      typeIndex: 0,
      typeArray: [{name: '未出租'}, {name: '已出租'}],
      ccIndex: 0,
      userName: '首页',
      leftIndex: 0,
      leftTabArray: [],
      rightArray: [],
      pageSize: 1,
      // region: ['上海市', '上海市', '浦东新区'],
    },
    setSearch(item){
      console.log(item.currentTarget.dataset.index);
      var searchIndex = item.currentTarget.dataset.index
      this.setData({
        isShowSearchBlock: false,
        searchIndex,
      })
    },
    toggleSearch(){
      this.setData({isShowSearchBlock: !this.data.isShowSearchBlock})
    },
    onPullDownRefresh(){
      // wx.startPullDownRefresh({
      //   success: (res) => {
      //     console.log(321);
      //   }
      // })
        wx.stopPullDownRefresh({
          success: (res) => {
            console.log(123);
            // this.setData({pageSize: 1, isMore: true})
            // this.initPublishDataList()
            // // console.log(123);
          },
          fail: (res) => {
            console.log(231);
          }
        })
    },
    initLeftMenu(){
      API.getType({}).then(res => {
        this.setData({
          leftTabArray: res.data
        })
        this.leftMenu(0)
        console.log(res.data);
        // return res
      })
    },
    initPublishDataList(){
      var { id } = this.data.leftTabArray[this.data.leftIndex]
      if(!this.data.isMore){
        return false
      }
      API.publishDataList({typeId: id, pageSize: this.data.pageSize}).then(res => {
        if(!res.data.length){
          this.setData({
            isMore: false
          })
          return false
        }
        if(this.data.pageSize === 1){
          this.setData({
            rightArray: res.data
          })
        }else{
          var appendData = this.data.rightArray.concat(res.data)
          this.setData({
            rightArray: appendData
          })
        }
       
      })
    },
    // 点击左边菜单
    leftMenu(e){
      if(e !== 0){
        this.setData({leftIndex: e.currentTarget.dataset.index, pageSize: 1, rightArray: [], isMore: true})
      }
     this.initPublishDataList()
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
    bindType_Change(e){
      this.setData({
        typeIndex: e.detail.value
      })
    },
    
    onReachBottom: function () {
      this.data.pageSize += 1
      this.initPublishDataList()
    },
    setUserName: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    }
})
