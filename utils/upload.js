// 通用上传文件或图片
import {beaseUrl} from '../request/config'
const uploadFile = (filePath, data) => {
  return new Promise((resolve , reject)=> {
      var userInfo = wx.getStorageSync('userInfo')
      wx.uploadFile({
        header: { Authorization: userInfo.id },
        url: beaseUrl+'/weChat/uploadFile', //仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        formData: data,
        success (res){
          resolve(JSON.parse(res.data))
        }
      })
  })

}
module.exports = {
  uploadFile,
}