// 全局提示框
const wxToast = message => {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 6000
  })
}
// 全局确认弹框
const wxShowModal = (title, content, fn) => {
  wx.showModal({
    title,
    content,
    success(res){
      fn(res)
    }
  })
}
module.exports = {
  wxToast,
  wxShowModal
}