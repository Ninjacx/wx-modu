import {area} from '../../../utils/commonData'
import {isNull, setResultList} from '../../../utils/common'
import {beaseUrl} from '../../../request/config'
import API from '../../../api/index'
import {uploadFile} from '../../../utils/upload'
var {wxToast} = getApp().globalData.common
Page({
  onLoad() {
      // 获取牌照类型下拉与类别下拉 
      Promise.all([ API.getType({}).then(res=>{return res}), API.getLicensePlate({}).then(res=>{ return res }), API.getRegion({}).then(res=>{ return res }), API.getFindOneUser({}).then(res=>{return res})])
      .then(arr => {
        var [type, licensePlate, region, userInitInfo] = arr
        // console.log('userInitInfo',userInitInfo);
        var result = setResultList(userInitInfo.data, ['lease_region_id', 'lease_contact', 'lease_contact_phone', 'lease_addr'])
        console.log('result',result.lease_region_id);
        /*****带出默认的数据***START***/
        region.data.map((item, index)=>{
          if(item.id === result.lease_region_id){
            this.data.initRegionIndex = index
            return
          }
        })
        this.data.pageData['contact'] = result.lease_contact
        this.data.pageData['contact_phone'] = result.lease_contact_phone
        this.data.pageData['addr_detail'] = result.lease_addr
        this.data.pageData['region_id'] = result.lease_region_id
        /*****带出默认的数据***END***/
        this.setData({
          // initLeaseUserInfo: initLeaseUserInfo,
          pageData: this.data.pageData,
          regionIndex: this.data.initRegionIndex,
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
    initRegionIndex: 0,
    
    // initLeaseUserInfo: [], // 保存默认基本数据（方便用户少填写一点）

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
      deposit: '',
      rent_day: '',
      rent_month: '',
      rent_year: '',
      region_id: 0,
      addr_detail: '',
      contact: '',
      contact_phone: '',
      description: '',
      pic_url: ''
    },
    // multiIndex: 0,
    multiArray: [],
    typeArray: [],
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    regionArray: [],
    // regionIndex: 0,
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
      console.log(123);
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
    
    // 类别为牌照的校验
    validateLicensePlate: function(){
      var {rent_month, rent_year, contact, contact_phone} = this.data.pageData
      if(!isNull(this.data, rent_month, '请填写月租金')){
        return false
      }
      if(!isNull(this.data, rent_year, '请填写年租金')){
        return false
      }
      if(!isNull(this.data, contact, '请填写联系人')){
        return false
      }
      if(!isNull(this.data, contact_phone, '请填写电话')){
        return false
      }
      // var {motorcycle_name, volume, rent_day, addr_detail, contact, contact_phone} = this.data.pageData
   
      // if(!isNull(this.data, motorcycle_name, '请填写车型名称')){
      //   return false
      // }
      // if(!isNull(this.data, volume, '请填写排量')){
      //   return false
      // }
      // if(!isNull(this.data, rent_day, '请填写日租金')){
      //   return false
      // }
      // if(!isNull(this.data, addr_detail, '请填写详细地址')){
      //   return false
      // }
      // if(!isNull(this.data, contact, '请填写联系人')){
      //   return false
      // }
      // if(!isNull(this.data, contact_phone, '请填写电话')){
      //   return false
      // }
      this.data.isNullFlag = false
    },
    validateMoto: function(){
      var {motorcycle_name, volume, deposit, rent_day, addr_detail, contact, contact_phone} = this.data.pageData
      
      if(!isNull(this.data, motorcycle_name, '请填写车型名称')){
        return false
      }
      if(!isNull(this.data, volume, '请填写摩托车排量')){
        return false
      }
      if(!isNull(this.data, deposit, '请填写押金')){
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
      this.data.isNullFlag = false
    },
    submitUserDoc: function(){
      // 当选择牌照则调用发布牌照的接口，其它都需要图片
      if(this.data.typeArray[this.data.typeArrayIndex].id === 3){
        this.validateLicensePlate()
        // 没有必填项则不走下面
        if(this.data.isNullFlag){
          return false
        }
        API.publishLicensePlate(this.data.pageData).then(res=>{
          wx.redirectTo({
            url: '/pages/userMenu/userPublish/userPublish'
          })
          wxToast(res.msg)
        })
      }else{
          this.validateMoto()
          // 没有必填项则不走下面
          if(this.data.isNullFlag){
            return false
          }
          if(this.data.files === '/image/driveCardA.png'){
            wxToast('请上传车辆照片')
            return false
          }
          uploadFile(this.data.files[0]).then((res)=>{
            this.data.pageData['pic_url'] = res.data.filePathName
            API.publish(this.data.pageData).then(res=>{
              wx.redirectTo({
                url: '/pages/userMenu/userPublish/userPublish'
              })
              wxToast(res.msg)
            })
          })
      }
    }
})
