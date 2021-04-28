import API from '../../../api/index'
import {setResultList} from '../../../utils/common'
Page({
  onLoad: function () {
    API.getFindOneUser().then(res=>{
      // console.log('onload', res.data);
      var result = setResultList(res.data, ['lease_user_type', 'lease_contact', 'lease_contact_phone', 'lease_emergency_contact', 'lease_emergency_phone', 'lease_addr', 'lease_cardA', 'lease_cardB', 'lease_addr_photo'])
      // this.data.initPageData = JSON.parse(JSON.stringify(result))
      this.setData({
        pageData: result
      })
      console.log('pageData',this.data.pageData);
    })
  },
  data: {

    multiArray: [{userTypeName: '个人'},{userTypeName: '商户'}],
    pageData:{
      lease_user_type: '',
      lease_contact: '',
      lease_contact_phone: '',
      lease_emergency_contact: '',
      lease_emergency_phone: '',
      lease_addr: '',
      lease_addr_photo: '', // 店面照片
      lease_cardA: '', // 身份证照片 正面
      lease_cardB: '', // 身份证照片 反面
    },
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
    frontDriveCard: '/image/driveCardA.png',// 驾驶证正面照片
    contraryDriveCard: '/image/driveCardB.png',// 驾驶证反面照片
  }, // 私有数据，可用于模板渲染
 
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
    bindPickerChange(e){
      this.data.pageData['lease_user_type'] = e.detail.value
      this.setData({
        pageData: this.data.pageData
      })
      console.log(this.data.pageData)
    },
    onReachBottom: function () {
      // this.onBottom();
      console.log('123');
    },
    setUserName: function(){
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    uploadImage: function(e){
      var _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          var cardJson = {1: {frontDriveCard: tempFilePaths},2: {contraryDriveCard: tempFilePaths}}
          _this.setData(cardJson[e.currentTarget.dataset.index])
        }
      })
    },
    submitUserDoc: function(){
      console.log('submitUserDoc');
    },
    selectSex: function(e){
      this.setData({sex: e.currentTarget.dataset.sex})
      console.log(this.data.sex);
    },
    updateInputValue(e){
      this.data.pageData[e.currentTarget.dataset.inputkey] = e.detail.value
    },
})
