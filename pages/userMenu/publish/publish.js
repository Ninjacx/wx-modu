import {area,carNumberType, carType} from '../../../utils/commonData'
import {beaseUrl} from '../../../request/config'
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    files: '/image/driveCardA.png', // 文件对象
    pageData: {
      motorcycle_name: '',
      license_plate_id: 0,
      volume: '',
      rent_day: '',
      rent_month: '',
      region_id: 3,
      addr_detail: '',
      contact: '',
      contact_phone: '',
    },
    // multiIndex: 0,
    multiArray: carNumberType,
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    leftTab: carType,
    //                                               
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
      this.data.pageData['region_id'] = e.detail.value
      this.setData({
        pageData: this.data.pageData
      })
    },
    bindPickerChange(e){
      this.data.pageData['license_plate_id'] = e.detail.value
      this.setData({
        pageData: this.data.pageData
      })
    },
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
          // const tempFilePaths = res.tempFilePaths
        
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.setData({files: tempFilePaths})
          // console.log('tempFilePaths[0]',tempFilePaths[0]);
          // console.log('------',_this.data.pageData['photo'][0]);
        }
      })
    },
    submitUserDoc: function(){
      wx.uploadFile({
        // /upload
        url: beaseUrl+'/weChat/publish', //仅为示例，非真实的接口地址
        filePath: this.data.files[0],
        name: 'file',
        formData: this.data.pageData,
        success (res){
          console.log('res',res.data);
          if(res.data === 200){
            // 是否继续发布 继续发布则留在此页面保留部分数据 
            // 不发布则返回
            wx.showToast({
              title: '发布成功',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      // motorcycleName, volume, rent_day, rent_month
      // API.publish({openId: this.data.OpenidSessionKeyParams.openid, encryptedData,iv,sessionKey: this.data.OpenidSessionKeyParams.sessionKey}).then(res=>{
      //   this.setData({
      //       isGetPhone: true,
      //       userAutoPhone: res
      //   })
      //     this.logins()
      // })
    },
    selectSex: function(e){
      this.setData({sex: e.currentTarget.dataset.sex})
      console.log(this.data.sex);
    }
  }
})
