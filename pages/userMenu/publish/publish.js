import {area} from '../../../utils/commonData'
import {beaseUrl} from '../../../request/config'
import API from '../../../api/index'
Component({
  pageLifetimes: {
    show() {
      // 获取牌照类型下拉与类别下拉
      Promise.all([API.getType({}).then(res=>{return res}), API.getLicensePlate({}).then(res=>{ return res })])
      .then(arr => {
        var [type, licensePlate] = arr
        this.setData({
          typeArray: type.data,
          multiArray: licensePlate.data
        })
        console.log(type.data); 
        console.log(licensePlate.data); 
      })
      .catch(err=>{
        console.log(err);
      })

    }
  },
  data: {
    files: '/image/driveCardA.png', // 文件对象
    typeArrayIndex: 0,
    licensePlateIndex: 0,
    pageData: {
      type_id: 1,
      motorcycle_name: '',
      license_plate_id: 1,
      volume: '',
      rent_day: '',
      rent_month: '',
      region_id: 1,
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
    regionArray: area(),
    // regionIndex: 0,
    // photo: '/image/driveCardA.png',// 车子照片
    contraryDriveCard: '/image/driveCardB.png',// 驾驶证反面照片
  }, // 私有数据，可用于模板渲染
 
  methods: {
    updateInputValue(e){
      this.data.pageData[e.currentTarget.dataset.inputkey] = e.detail.value
    },
    bindRegionChange(e){
      this.data.pageData['region_id'] = this.data.regionArray[e.detail.value].id
      this.setData({
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
    submitUserDoc: function(){
      // 当选择牌照则调用发布牌照的接口，其它都需要图片
      if(this.data.typeArray[this.data.typeArrayIndex].id === 3){
        API.publishLicensePlate(this.data.pageData).then(res=>{
          console.log('res', res);
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
              wx.showToast({
                title: '发布成功',
                icon: 'none',
                duration: 2000
              })
            }
          })
      }
     
    }
  }
})
