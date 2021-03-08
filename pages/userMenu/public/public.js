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
    multiArray:[{id: 0,name: '沪牌'},{id: 1,name: '外牌'}],
    sex: '1', // 0 女 1 男
    userName: '首页',
    leftIndex: 0,
    leftTab: [{title: '摩托车'},{title: '汽车'}],
    //                                               
    regionArray: [{id: 0,name: '黄浦区'}, {id: 1,name: '徐汇区'},{id: 2,name: '长宁区'},{id: 3,name: '静安区'},{id: 4,name: '普陀区'},{id: 4,name: '虹口区'},
                  {id: 5,name: '杨浦区'}, {id: 6, name: '闵行区'}, {id: 7, name: '宝山区'}, {id: 8, name: '嘉定区' },{id: 9, name: '浦东新区'}, {id: 10, name: '金山区'},
                  {id: 11, name: '松江区'},{id: 12, name: '青浦区'},{id: 13, name: '奉贤区'},{id: 14, name: '崇明区'}],
    regionIndex: 0,
    photo: '/image/driveCardA.png',// 车子照片
    contraryDriveCard: '/image/driveCardB.png',// 驾驶证反面照片
  }, // 私有数据，可用于模板渲染
 
  methods: {
    bindRegionChange(e){
      console.log('e',e);
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
