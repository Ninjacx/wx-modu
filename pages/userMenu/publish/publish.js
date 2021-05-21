import {area} from '../../../utils/commonData'
import {isNull} from '../../../utils/common'
import {beaseUrl} from '../../../request/config'
import API from '../../../api/index'
var {wxToast} = getApp().globalData.common
Page({
  onLoad() {
      // 获取牌照类型下拉与类别下拉 
      Promise.all([API.getFindOneUser({}).then(res=>{return res}), API.getType({}).then(res=>{return res}), API.getLicensePlate({}).then(res=>{ return res }), API.getRegion({}).then(res=>{ return res })])
      .then(arr => {
        var [userInfo, type, licensePlate, region] = arr
        var result = setResultList(userInfo.data, ['lease_region_id', 'lease_contact', 'lease_contact_phone', 'lease_addr'])
        // console.log('userInfo',result);
        this.setData({
          typeArray: type.data,
          multiArray: licensePlate.data,
          regionArray: region.data
        })
      })
      .catch(err=>{
        console.log(err);
      })
  },
  data: {
    isNullFlag: false, // 全局校验的标识，true为不让提交，false 过验证能提交
    files: '/image/driveCardA.png', // 文件对象
    typeArrayIndex: 0,
    licensePlateIndex: 0,
    regionIndex: 0,
    pageData: {
      type_id: 1,
      motorcycle_name: '',
      license_plate_id: 1,
      volume: '',
      rent_day: '',
      rent_month: '',
      region_id: 0,
      addr_detail: '',
      contact: '',
      contact_phone: '',
    },
    // multiIndex: 0,
    multiArray: [],
    typeArray: [],
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    regionArray: [],
    // regionIndex: 0,
    // photo: '/image/driveCardA.png',// 车子照片
    contraryDriveCard: '/image/driveCardB.png',// 驾驶证反面照片
  }, // 私有数据，可用于模板渲染
    updateInputValue(e){
      this.data.pageData[e.currentTarget.dataset.inputkey] = e.detail.value
    },
    bindRegionChange(e){
      this.data.pageData['region_id'] = this.data.regionArray[e.detail.value].id
      this.setData({
        regionIndex: e.detail.value,
        pageData: this.data.pageData
      })
    },
    bindPickerChange(e){
      this.data.pageData['license_plate_id'] = this.data.multiArray[e.detail.value].id
      this.setData({
        licensePlateIndex: e.detail.value,
        pageData: this.data.pageData
      })
    },
    bindPickerTypeChange(e){
      this.data.pageData['type_id'] = e.currentTarget.dataset.type_id
      this.setData({
        typeArrayIndex: e.detail.value
      })
      this.data.pageData['type_id'] = this.data.typeArray[this.data.typeArrayIndex].id
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
          _this.setData({files: tempFilePaths})
        }
      })
    },
    
    validate: function(){
      // motorcycle_name: '',
      // license_plate_id: 1,
      // volume: '',
      // rent_day: '',
      // rent_month: '',
      // region_id: 1,
      // addr_detail: '',
      // contact: '',
      // contact_phone: '',
      var {motorcycle_name, volume, rent_day, addr_detail, contact, contact_phone} = this.data.pageData
   
      if(!isNull(this.data, motorcycle_name, '请填写车型名称')){
        return false
      }
      if(!isNull(this.data, volume, '请填写排量')){
        return false
      }
      if(!isNull(this.data, rent_day, '请填写日租金')){
        return false
      }
      if(!isNull(this.data, addr_detail, '请填写详细地址')){
        return false
      }
      if(!isNull(this.data, contact, '请填写联系人')){
        return false
      }
      if(!isNull(this.data, contact_phone, '请填写电话')){
        return false
      }
    },
    submitUserDoc: function(){
      this.validate()
      // 没有必填项则不走下面
      if(this.data.isNullFlag){
        return false
      }
      // 当选择牌照则调用发布牌照的接口，其它都需要图片
      if(this.data.typeArray[this.data.typeArrayIndex].id === 3){
        // var {} = this.data.pageData
        API.publishLicensePlate(this.data.pageData).then(res=>{
          wx.redirectTo({
            url: '/pages/userMenu/userPublish/userPublish'
          })
          wxToast(res.msg)
        })
      }else{
         // 当类别为牌照的时候 调用不上传图片的接口
          var userInfo = wx.getStorageSync('userInfo')
          wx.uploadFile({
            // /upload
            header: { Authorization: userInfo.id },
            url: beaseUrl+'/weChat/publish', //仅为示例，非真实的接口地址
            filePath: this.data.files[0],
            name: 'file',
            formData: this.data.pageData,
            success (res){
              // 关闭当前页面，跳转到我的订单里
              wx.redirectTo({
                url: '/pages/userMenu/userPublish/userPublish'
              })
              wxToast('发布成功')
            }
          })
      }
    }
})
