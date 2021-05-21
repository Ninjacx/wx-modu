// 全局提示框
const wxToast = message => {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}
// 全局确认弹框
const wxShowModal = (params, fn) => {
  var {title, content, cancelText} = params
  var cancelText  = cancelText || '取消'
  wx.showModal({
    title,
    content,
    cancelText,
    success(res){
      fn(res)
    }
  })
}
module.exports = {
  wxToast,
  wxShowModal
}