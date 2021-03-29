import {area,carNumberType, carType} from '../../../utils/commonData'
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
    pageData: {
      motorcycleName: '',
      licensePlateId: 0,
      volume: '',
      rentDay: '',
      rentMonth: '',
      regionId: 3,
      addrDetail: '',
      contact: '',
      contactPhone: '',
      photo: '/image/driveCardA.png', // 车子照片
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
      this.data.pageData['regionId'] = e.detail.value
      this.setData({
        pageData: this.data.pageData
      })
    },
    bindPickerChange(e){
      this.data.pageData['licensePlateId'] = e.detail.value
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
          //   wx.uploadFile({
          //     url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          //     filePath: tempFilePaths[0],
          //     name: 'file',
          //     formData: {
          //       'user': 'test'
          //     },
          //     success (res){
          //       const data = res.data
          //       //do something
          //     }
          //   })
          // tempFilePath可以作为img标签的src属性显示图片
          console.log('res',res);
          const tempFilePaths = res.tempFilePaths
          console.log(_this.data.pageData['photo'])
          _this.data.pageData['photo'] = tempFilePaths
          _this.setData({pageData: _this.data.pageData})
        }
      })
    },
    submitUserDoc: function(){
      // console.log('submitUserDoc',this.data);
      console.log(this.data.pageData);
      return false
      // motorcycleName, volume, rentDay, rentMonth
      API.publish({openId: this.data.OpenidSessionKeyParams.openid, encryptedData,iv,sessionKey: this.data.OpenidSessionKeyParams.sessionKey}).then(res=>{
        this.setData({
            isGetPhone: true,
            userAutoPhone: res
        })
          this.logins()
      })
    },
    selectSex: function(e){
      this.setData({sex: e.currentTarget.dataset.sex})
      console.log(this.data.sex);
    }
  }
})
