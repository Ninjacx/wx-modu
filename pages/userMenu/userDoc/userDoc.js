import API from '../../../api/index'
import {imgUrlHost} from '../../../request/config'
import {isNull, setResultList} from '../../../utils/common'
var {wxToast} = getApp().globalData.common
// 
import {uploadFile} from '../../../utils/upload'
Page({
  onLoad: function () {
    API.getFindOneUser().then(res=>{
      // console.log('onload', res.data);
      var result = setResultList(res.data, ['real_name', 'contact_phone', 'drive_licence', 'sex', 'emergency_contact', 'emergency_phone', 'drive_cardA', 'drive_cardB'])
      this.data.initPageData = JSON.parse(JSON.stringify(result))
      this.setData({
        pageData: result
      })
    })
  }, 
  data: {
    isNullFlag: false,
    imgUrlHost: imgUrlHost,
    initPageData: [],
    pageData:{
      real_name: '', //姓名
      contact_phone: '', // 联系人电话
      drive_licence: '', // 驾驶证号码
      sex: 1, // 性别
      emergency_contact: '', // 紧急联系人
      emergency_phone: '', // 紧急联系人电话
      drive_cardA: '',
      drive_cardB: '',
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
    onReachBottom: function () {
      // this.onBottom();
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
            _this.data.pageData.drive_cardA = ''
            fileList.driveCardA = tempFilePaths
          }
          if(e.currentTarget.dataset.index == 2){
            _this.data.pageData.drive_cardB = ''
            fileList.driveCardB = tempFilePaths
          }
          _this.setData({
            files: fileList,
            pageData: _this.data.pageData
          })
        }
      })
    },
    validate: function(){
      var {real_name, contact_phone, drive_licence, emergency_contact, emergency_phone, drive_cardA, drive_cardB} = this.data.pageData
      if(!isNull(this.data, real_name, '请填写姓名')){
        return false
      }
      if(!isNull(this.data, contact_phone, '请填写联系人电话')){
        return false
      }
      if(!isNull(this.data, drive_licence, '请填写驾驶证号码')){
        return false
      }
      if(!isNull(this.data, emergency_contact, '请填写紧急联系人')){
        return false
      }
      if(!isNull(this.data, emergency_phone, '请填写紧急联系人电话')){
        return false
      }
      if(this.data.files.driveCardA === '/image/driveCardA.png' &&!isNull(this.data, drive_cardA, '', false)){
        wxToast('请上传驾驶证正面')
        return false
      }
      if(this.data.files.driveCardB === '/image/driveCardB.png' &&!isNull(this.data, drive_cardB, '', false)){
        wxToast('请上传驾驶证反面')
        return false
      }
      this.data.isNullFlag = false
    },
    submitUserDoc: function(){
      this.validate()
      console.log('this.data.isNullFlag',this.data.isNullFlag);
      // 没有必填项则不走下面
      if(this.data.isNullFlag) {
        return false
      }
      // 当修改了图片则走上传图片
      if(this.data.initPageData.drive_cardA != this.data.pageData.drive_cardA && this.data.initPageData.drive_cardB != this.data.pageData.drive_cardB){
        console.log('全改了');
          // 1.上传图片 2. 拿到上传的图片链接，更新用户资料
          Promise.all([uploadFile(this.data.files.driveCardA[0],{type: 'A'}).then((res)=>{return res}),uploadFile(this.data.files.driveCardB[0],{type: 'B'}).then((res)=>{return res})])
          .then(result => {
            // console.log('result',result);
            var [driveCardA, driveCardB] = result
            this.data.pageData.drive_cardA = driveCardA.data.filePathName
            this.data.pageData.drive_cardB = driveCardB.data.filePathName
            this.updateUserDoc()
          }).catch(err=>{
            console.log(err);
          })
      }else if(this.data.initPageData.drive_cardA != this.data.pageData.drive_cardA && this.data.initPageData.drive_cardB == this.data.pageData.drive_cardB) {
        console.log('只改了A');
        uploadFile(this.data.files.driveCardA[0],{type: 'A'}).then((res)=>{
            this.data.pageData.drive_cardA = res.data.filePathName
            this.updateUserDoc()
        }).catch(err=>{
            console.log(err);
        })
      }else if(this.data.initPageData.drive_cardB != this.data.pageData.drive_cardB && this.data.initPageData.drive_cardA == this.data.pageData.drive_cardA) {
        console.log('只改了B');
        uploadFile(this.data.files.driveCardB[0],{type: 'A'}).then((res)=>{
            this.data.pageData.drive_cardB = res.data.filePathName
            this.updateUserDoc()
        }).catch(err=>{
            console.log(err);
        })
      }else{
        console.log('没改图');
        this.updateUserDoc()
      }
    },
    updateUserDoc: function(){
      API.setUserDoc(this.data.pageData).then(res=>{ 
        wxToast(res.msg)
      })
    },
    selectSex: function(e){
      this.data.pageData['sex'] =  e.currentTarget.dataset.sex
      this.setData({pageData: this.data.pageData})
    },
    updateInputValue(e){
      this.data.pageData[e.currentTarget.dataset.inputkey] = e.detail.value
    },
})
