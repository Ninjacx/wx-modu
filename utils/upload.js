// 通用上传文件或图片
import {beaseUrl} from '../request/config'
const uploadFile = (filePath, data) => {
  return new Promise((resolve , reject)=> {
      var userInfo = wx.getStorageSync('userInfo')
      console.log('filePath', filePath);
      wx.uploadFile({
        header: { Authorization: userInfo.id },
        url: beaseUrl+'/weChat/uploadFile', //仅为示例，非真实的接口地址
        filePath: filePath,
        name: 'file',
        formData: data,
        success (result){
          var res = JSON.parse(result.data)
          if(res.code === 200){
            resolve(res)
          }
        }
      })
  })
}
module.exports = {
  uploadFile,
}