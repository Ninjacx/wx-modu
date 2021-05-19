import API from '../../../api/index'
var {wxToast, wxShowModal} = getApp().globalData.common
      Page({
        onLoad: function () {
          this.init()
        },
  data: {
    pageData: [],
    status: {0: '审核中',1: '申请成功',2: '已拒绝'}
  }, // 私有数据，可用于模板渲染
    init(){
      API.getFindOneUser({}).then(res => {
        this.setData({
          pageData: res.data
        })
        console.log('pageData',this.data.pageData);
      })
    },
    toUserPublicDoc(){
      wx.navigateTo({
        url: '/pages/userMenu/userPublicDoc/userPublicDoc'
      })
    },
    // 申请成为商户
    applyMember(){
      wxShowModal('是否已经完善完整租借资料', '没有完善资料则不能通过' ,(res)=>{
        // 确认删除
        if(res.confirm){
          API.applyMember({}).then(res => {
            if(res.data === 1){
              this.data.pageData.apply_status = 0
              this.setData({
                pageData: this.data.pageData
              })
              wxToast(res.msg)
            }
            
          })
        }
      }) 
    },
    // 拨打电话
    callPhone(){
      wx.makePhoneCall({
        phoneNumber: '18121118073' //仅为示例，并非真实的电话号码
      })
    },
})
