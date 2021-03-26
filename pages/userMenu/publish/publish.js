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
    multiIndex: 0,
    multiArray: carNumberType,
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    leftTab: carType,
    //                                               
    regionArray: area(),
    regionIndex: 0,
    photo: '/image/driveCardA.png',// 车子照片
    contraryDriveCard: '/image/driveCardB.png',// 驾驶证反面照片
  }, // 私有数据，可用于模板渲染
 
  methods: {
    bindRegionChange(e){
      this.setData({
        regionIndex: e.detail.value
      })
    },
    bindPickerChange(e){
      this.setData({
        multiIndex: e.detail.value
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
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.setData({photo: tempFilePaths})
        }
      })
    },
    submitUserDoc: function(){
      console.log('submitUserDoc');
    },
    selectSex: function(e){
      this.setData({sex: e.currentTarget.dataset.sex})
      console.log(this.data.sex);
    }
  }
})
