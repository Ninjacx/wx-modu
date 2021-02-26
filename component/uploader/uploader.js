// component/uploader/uploader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width:{
      type:Number,
      value:132
    },
    height:{
      type:Number,
      value:184
    },
  },
  attached(){
    //拼接dom样式
    let newStyle = `width:${this.data.width}rpx;height:${this.data.height}rpx`
    this.setData({
      domStyles:newStyle
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    uplaodSrc:"",//上传的图片地址
    domStyles:'',//拼接的宽高样式
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showImg(event){
      //预览图片
      let {src} = event.currentTarget.dataset
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    },
    delImg(){
      //删除图片
      this.setData({
        uplaodSrc:''
      })
      this.triggerEvent('uploadImg','')
    },
    uploadImg(){
      //上传照片
      let _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this.setData({
            uplaodSrc:tempFilePaths[0]
          })
          _this.triggerEvent('uploadImg',tempFilePaths[0])
        }
      })
    }
  }
})
