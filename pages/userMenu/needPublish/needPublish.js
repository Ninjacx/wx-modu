import API from '../../../api/index'
import {isNull} from '../../../utils/common'
Component({
  pageLifetimes: {
    show() {
     
    }
  },
  data: {
    isNullFlag: false, // 全局校验的标识，true为不让提交，false 过验证能提交
    content: '',
    phone: '',
  }, // 私有数据，可用于模板渲染
 
  methods: {
    validate(){
      if(!isNull(this.data, this.data.content, '请填写发布内容')){
        return false
      }
      if(!isNull(this.data, this.data.phone, '请填写手机/微信')){
        return false
      }
      return true
    },
    submitNeed(){
      if(!this.validate()){
        return false
      }
      // 没有必填项则不走下面
      // if(this.data.isNullFlag){
      //   return false
      // }
      var {content, phone} = this.data
      API.addDemand({content, phone}).then(res => {
        wx.navigateBack()
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      })
    },
    updateInputValue(e){
      this.data[e.currentTarget.dataset.inputkey] = e.detail.value
    },
  }
})
