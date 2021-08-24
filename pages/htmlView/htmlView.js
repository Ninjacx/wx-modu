var {wxToast} = getApp().globalData.common
import {beaseUrl} from '../../request/config'
Page({
  onLoad: function (params) {
    console.log('params',params);
  },
  data: {
    beaseUrl: beaseUrl,
  }, // 私有数据，可用于模板渲染
    aa: function(){
      this.setData({
        userName: '李四'
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    }
})
