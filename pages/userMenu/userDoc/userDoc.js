import API from '../../../api/index'
import {beaseUrl} from '../../../request/config'
import {uploadFile} from '../../../utils/upload'
Page({
  onLoad: function () {
    API.getFindOneUser().then(res=>{
      console.log('onload', res);
      this.setData({
        pageData: res.data
      })
    })
  },
  data: {
    pageData:{
      real_name: '', //姓名
      phone: '', // 联系人电话
      drive_licence: '', // 驾驶证号码
      sex: 1, // 性别
      emergency_contact: '', // 紧急联系人
      emergency_phone: '', // 紧急联系人电话
    },
    files:{
      driveCardA: '/image/driveCardA.png',// 驾驶证正面照片
      driveCardB: '/image/driveCardB.png',// 驾驶证反面照片
    },
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
      this.data.pageData['user_type'] = e.detail.value
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
        success(res){
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          // var cardJson = {1: {driveCardA: tempFilePaths},2: {driveCardB: tempFilePaths}}
          var fileList = _this.data.files
          if(e.currentTarget.dataset.index == 1){
            fileList.driveCardA = tempFilePaths
          }
          if(e.currentTarget.dataset.index == 2){
            fileList.driveCardB = tempFilePaths
          }
          _this.setData({
            files: fileList
          })
        }
      })
    },
    submitUserDoc: function(){
      // 1.上传图片 2. 拿到上传的图片链接，更新用户资料
      // uploadFile(this.data.files.driveCardA[0],{type: 'A'}), uploadFile(this.data.files.driveCardB[0],{type: 'B'})  , uploadFile(this.data.files.driveCardB[0],{type: 'B'} , (res)=>{console.log('---', res);return res} )
      Promise.all([uploadFile(this.data.files.driveCardA[0],{type: 'A'}).then((res)=>{return res}),uploadFile(this.data.files.driveCardB[0],{type: 'B'}).then((res)=>{return res})])
      .then(result => {
        // console.log('result',result);
        var [driveCardA, driveCardB] = result
        console.log('driveCardA.data.params.filePathName',driveCardA.data.params.filePathName);
        console.log('driveCardA.data.params.filePathName',driveCardB.data.params.filePathName);
        // if(driveCardA.data.params.type === 'A'){
        //   driveCardA.data.params.filePathName
        // }
        // if(driveCardB.data.params.type === 'B'){
        //   driveCardA.data.params.filePathName
        // }
        // console.log('driveCardA, driveCardB',driveCardA.data.params.type === 'A', driveCardB);
        // this.setData({
        //   typeArray: type.data,
        //   multiArray: licensePlate.data
        // })
      })
      .catch(err=>{
        console.log(err);
      })
      
      
      // var userInfo = wx.getStorageSync('userInfo')
      // console.log(beaseUrl+'/weChat/setUserDoc');
      // wx.uploadFile({
      //   // /upload
      //   header: { Authorization: userInfo.id },
      //   url: beaseUrl+'/weChat/setUserDoc', //仅为示例，非真实的接口地址
      //   filePath: `${this.data.files.driveCardA[0]},${this.data.files.driveCardB[0]}`,
      //   name: 'file',
      //   formData: this.data.pageData,
      //   success (res){
      //   }
      // })
    },
    selectSex: function(e){
      this.data.pageData['sex'] =  e.currentTarget.dataset.sex
      this.setData({pageData: this.data.pageData})
    },
    updateInputValue(e){
      this.data.pageData[e.currentTarget.dataset.inputkey] = e.detail.value
    },
})
