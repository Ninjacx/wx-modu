import {beaseUrl} from './config'
import {beaseUrlWx} from './configWx'
function _request({url , data , method},isWxUrl = false) {
  wx.showLoading({mask: true});
  return new Promise((resolve , reject)=> {
    var token = wx.getStorageSync('token')
    console.log('isWxUrl? beaseUrlWx + url: beaseUrl + url,',isWxUrl? beaseUrlWx + url: beaseUrl + url,);
      wx.request({
          url: isWxUrl? beaseUrlWx + url: beaseUrl + url,
          data,
          header: Object.assign({'content-type':'application/json'},token ? {Authorization: 'Bearer ' + token}: {}),
          method: method || 'get',
          success: (res)=>{
              if(res.statusCode === 200){
                resolve(res.data)
              }else{
                reject(res.msg);
                setTimeout(() => {
                  //解决真机一闪消失问题
                  wx.showToast({
                    title: res.msg || '服务器失联',
                    icon: 'none',
                    duration: 2000
                  })
                }, 100);
              }
          },
          fail: (err)=>{
            setTimeout(() => {
              wx.showToast({
                title: err.msg || '服务器失联',
                icon: 'none',
                duration: 2000
              })
            }, 100);
            reject(err);
          },
          complete: ()=>{
              wx.hideLoading();
          }
      });
  })
}
module.exports = {
  _request
}