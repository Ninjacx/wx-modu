import API from '../../../api/index'
Component({
  pageLifetimes: {
    show() {
     
    }
  },
  data: {
    content: '',
    phone: '',
  }, // 私有数据，可用于模板渲染
 
  methods: {
    // 拨打电话
    bindTextAreaBlur(){
    
    },
    submitAdvice(){
      var {content, phone} = this.data
      API.addAdvice({content, phone}).then(res => {
        wx.navigateBack();
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
