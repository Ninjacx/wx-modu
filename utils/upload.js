// 通用上传文件或图片
import {beaseUrl} from '../request/config'
const uploadFile = (filePath, data, fn) => {
  var userInfo = wx.getStorageSync('userInfo')
  wx.uploadFile({
    // /upload
    header: { Authorization: userInfo.id },
    url: beaseUrl+'/weChat/uploadFile', //仅为示例，非真实的接口地址
    filePath: filePath,
    name: 'file',
    formData: data,
    success (res){
      fn(res)
    }
  })
}
module.exports = {
  uploadFile,
}