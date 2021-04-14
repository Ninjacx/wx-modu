// 全局提示框
const wxToast = message => {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 6000
  })
}

module.exports = {
  wxToast
}