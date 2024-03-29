import API from '../../../api/index'
import {isNull, setResultList} from '../../../utils/common'
import {imgUrlHost} from '../../../request/config'
var {wxToast} = getApp().globalData.common
import {uploadFile} from '../../../utils/upload'
Page({
  onLoad: function () {
     Promise.all([API.getFindOneUser({}).then(res=>{return res}), API.getRegion({}).then(res=>{ return res })])
      .then(arr => {
        var [userInfo, region] = arr
             var result = setResultList(userInfo.data, ['lease_user_type', 'lease_region_id', 'lease_contact', 'lease_contact_phone', 'lease_emergency_contact', 'lease_emergency_phone', 'lease_addr', 'lease_cardA', 'lease_cardB', 'lease_addr_photo'])
             this.data.initPageData = JSON.parse(JSON.stringify(result))
            
             // 根据regionId 获取下标赋值车辆所在区
             var regionIndex = 0
              region.data.filter((item, index)=>{
                if(item.id === result.lease_region_id){
                  regionIndex = index
                }
             })
             this.setData({
               pageData: result,
               regionIndex: regionIndex,
               regionArray: region.data
             })
      })
      .catch(err=>{
        console.log(err);
      })
    // API.getFindOneUser().then(res=>{
    //   // console.log('onload', res.data);
    //   var result = setResultList(res.data, ['lease_user_type', 'lease_contact', 'lease_contact_phone', 'lease_emergency_contact', 'lease_emergency_phone', 'lease_addr', 'lease_cardA', 'lease_cardB', 'lease_addr_photo'])
    //   this.data.initPageData = JSON.parse(JSON.stringify(result))
    //   this.setData({
    //     pageData: result
    //   })
    //   console.log('pageData',this.data.pageData);
    // })
  },
  data: {
    isNullFlag: false, // 全局校验的标识，true为不让提交，false 过验证能提交
    imgUrlHost: imgUrlHost,
    multiArray: [{userTypeName: '个人'},{userTypeName: '商户'}],
    regionIndex: 0,
    regionArray: [],
    pageData:{
      lease_region_id: 0,
      lease_user_type: 0,
      lease_contact: '',
      lease_contact_phone: '',
      lease_emergency_contact: '',
      lease_emergency_phone: '',
      lease_addr: '',
      lease_addr_photo: '', // 店面照片
      lease_cardA: '', // 身份证照片 正面
      lease_cardB: '', // 身份证照片 反面
      frontDriveCard: '',// 驾驶证正面照片
      contraryDriveCard: '',// 驾驶证反面照片
    },
    files:{
      lease_cardA: '/image/driveCardA.png',// 驾驶证正面照片
      lease_cardB: '/image/driveCardB.png',// 驾驶证反面照片
      lease_addr_photo: '/image/driveCardA.png' //店面照片
    },
    
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    leftTab: [{title: '摩托车'},{title: '汽车'}],
    region: ['上海市', '上海市', '浦东新区'],
    
  }, // 私有数据，可用于模板渲染
 
    // 点击左边菜单
    leftMenu(e){
      this.setData({
        leftIndex: e.currentTarget.dataset.index
      })
      console.log(e);
    },
    bindRegionChange(e){
      this.data.pageData['lease_region_id'] = this.data.regionArray[e.detail.value].id
      this.setData({
        regionIndex: e.detail.value,
        pageData: this.data.pageData
      })
    },
    // 进入详情
    toDetail(){
      wx.navigateTo({
        url: '/pages/detail/detail?id='
      })
    },
    // bindRegionChange: function (e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value)
    //   this.setData({
    //     region: e.detail.value
    //   })
    // },
    bindPickerChange(e){
      this.data.pageData['lease_user_type'] = e.detail.value
      // 选择商户则清空掉个人上传的图片重新上传
      if(e.detail.value === '1'){
        this.data.pageData['lease_addr_photo'] = ''
      }else{ // 选择个人则清空掉个人上传的图片重新上传
        this.data.pageData['lease_cardA'] = ''
        this.data.pageData['lease_cardB'] = ''
      }
      this.setData({
        pageData: this.data.pageData
      })
    },
    // onReachBottom: function () {
    //   // this.onBottom();
    //   console.log('123');
    // },
    uploadImage: function(e){
      var _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          // var cardJson = {1: {driveCardA: tempFilePaths},2: {driveCardB: tempFilePaths}}
          var fileList = _this.data.files
          // 身份证正面
          if(e.currentTarget.dataset.index == 1){
            _this.data.pageData.lease_cardA = ''
            fileList.lease_cardA = tempFilePaths
          }
          // 身份证背面
          if(e.currentTarget.dataset.index == 2){
            _this.data.pageData.lease_cardB = ''
            fileList.lease_cardB = tempFilePaths
          }
          // 商户店铺照
          if(e.currentTarget.dataset.index == 3){
            _this.data.pageData.lease_addr_photo = ''
            fileList.lease_addr_photo = tempFilePaths
          }
          _this.setData({
            files: fileList,
            pageData: _this.data.pageData
          })
          // // tempFilePath可以作为img标签的src属性显示图片
          // const tempFilePaths = res.tempFilePaths
          // var cardJson = {1: {frontDriveCard: tempFilePaths},2: {contraryDriveCard: tempFilePaths}}
          // _this.setData(cardJson[e.currentTarget.dataset.index])
        }
      })
    },
    validate: function(){
      // lease_contact: '',
      // lease_contact_phone: '',
      // lease_emergency_contact: '',
      // lease_emergency_phone: '',
      // lease_addr: '',
      // lease_addr_photo: '', // 店面照片
      // lease_cardA: '', // 身份证照片 正面
      // lease_cardB: '', // 身份证照片 反面
      // frontDriveCard: '',// 驾驶证正面照片
      // contraryDriveCard: '',// 驾驶证反面照片
      var strType = {0: '姓名', 1: '商户名'}
      var {lease_contact, lease_contact_phone, lease_emergency_contact, lease_emergency_phone, lease_addr, lease_addr_photo, lease_cardA, 
        lease_cardB } = this.data.pageData
      if(!isNull(this.data, lease_contact, '请填写'+strType[this.data.pageData.lease_user_type])){
        return false
      }
      if(!isNull(this.data, lease_contact_phone, '请填写联系人电话')){
        return false
      }
      if(!isNull(this.data, lease_emergency_contact, '请填写紧急联系人')){
        return false
      }
      if(!isNull(this.data, lease_emergency_phone, '请填写紧急联系人电话')){
        return false
      }
      if(!isNull(this.data, lease_addr, '请填写车辆地址')){
        return false
      }
      
      if(this.data.pageData.lease_user_type == 1){
        if(this.data.files.lease_addr_photo === '/image/driveCardA.png' &&!isNull(this.data, lease_addr_photo, '', false)){
          wxToast('请上传店面照片')
          return false
        }
      }else{
          if(this.data.files.lease_cardA  === '/image/driveCardA.png' &&!isNull(this.data, lease_cardA, '', false)){
            wxToast('请上传身份证正面')
            return false
          }
          if(this.data.files.lease_cardB === '/image/driveCardB.png' &&!isNull(this.data, lease_cardB, '', false)){
            wxToast('请上传身份证反面')
            return false
          }
      }
      this.data.isNullFlag = false
    },
    // 更新用户信息
    updateUserDoc: function(){
      API.setUserDoc(this.data.pageData).then(res=>{ 
        wxToast(res.msg)
      })
    },
    submitUserDoc: function(){
      this.validate()
      // 没有必填项则不走下面
      if(this.data.isNullFlag){
        return false
      }
        // 商户的上传
        if(this.data.pageData.lease_user_type == 1){
          if(this.data.initPageData.lease_addr_photo != this.data.pageData.lease_addr_photo || !this.data.pageData.lease_addr_photo){
              uploadFile(this.data.files.lease_addr_photo[0]).then((fiileRes)=> {
                this.data.pageData.lease_addr_photo = fiileRes.data.filePathName
                this.updateUserDoc()
              })
          }else{
            this.updateUserDoc()
          }
        }else { 
          // 个人的上传
          if(this.data.initPageData.lease_cardA != this.data.pageData.lease_cardA && this.data.initPageData.lease_cardB != this.data.pageData.lease_cardB){
            console.log('全改了');
              // 1.上传图片 2. 拿到上传的图片链接，更新用户资料
              Promise.all([uploadFile(this.data.files.lease_cardA[0],{type: 'A'}).then((res)=>{return res}),uploadFile(this.data.files.lease_cardB[0],{type: 'B'}).then((res)=>{return res})])
              .then(result => {
                // console.log('result',result);
                var [lease_cardA, lease_cardB] = result
                this.data.pageData.lease_cardA = lease_cardA.data.filePathName
                this.data.pageData.lease_cardB = lease_cardB.data.filePathName
                this.updateUserDoc()
              }).catch(err=>{
                console.log(err);
              })
          }else if(this.data.initPageData.lease_cardA != this.data.pageData.lease_cardA && this.data.initPageData.lease_cardB == this.data.pageData.lease_cardB) {
            console.log('只改了A');
            console.log('this.data.files.lease_cardA[0]', this.data.files.lease_cardA[0]);
            uploadFile(this.data.files.lease_cardA[0],{type: 'A'}).then((res)=>{
                this.data.pageData.lease_cardA = res.data.filePathName
                this.updateUserDoc()
            }).catch(err=>{
                console.log(err);
            })
          }else if(this.data.initPageData.lease_cardB != this.data.pageData.lease_cardB && this.data.initPageData.lease_cardA == this.data.pageData.lease_cardA) {
            console.log('只改了B');
            uploadFile(this.data.files.lease_cardB[0],{type: 'A'}).then((res)=>{
                this.data.pageData.lease_cardB = res.data.filePathName
                this.updateUserDoc()
            }).catch(err=>{
                console.log(err);
            })
          }else{
            console.log('没改图');
            this.updateUserDoc()
          }


          // if(this.data.initPageData.lease_cardA != this.data.pageData.lease_cardA || this.data.initPageData.lease_cardB != this.data.pageData.lease_cardB || !this.data.initPageData.lease_cardA || !this.data.initPageData.lease_cardB){
          //   // 1.上传图片 2. 拿到上传的图片链接，更新用户资料
          //     Promise.all([uploadFile(this.data.files.lease_cardA[0],{type: 'A'}).then((res)=>{return res}),uploadFile(this.data.files.lease_cardB[0],{type: 'B'}).then((res)=>{return res})])
          //     .then(result => {
          //       // console.log('result',result);
          //       var [lease_cardA, lease_cardB] = result
          //       this.data.pageData.lease_cardA = lease_cardA.data.filePathName
          //       this.data.pageData.lease_cardB = lease_cardB.data.filePathName
          //       this.updateUserDoc()
          //     })
          //     .catch(err=>{
          //       console.log(err);
          //     })
          // }else{
          //   this.updateUserDoc()
          // }
        }
    },
    selectSex: function(e){
      this.setData({sex: e.currentTarget.dataset.sex})
      console.log(this.data.sex);
    },
    updateInputValue(e){
      this.data.pageData[e.currentTarget.dataset.inputkey] = e.detail.value
    },
})
