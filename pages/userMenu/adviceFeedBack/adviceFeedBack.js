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
      if(!isNull(this.data, this.data.content, '请填写反馈内容')){
        return false
      }
    },
    submitAdvice(){
      this.validate()
      // 没有必填项则不走下面
      if(this.data.isNullFlag){
        return false
      }
      var {content, phone} = this.data


      API.addAdvice({content, phone}).then(res => {
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
