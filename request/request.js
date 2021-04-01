import {beaseUrl} from './config'
import {beaseUrlWx} from './configWx'
function _request({url , data , method},isWxUrl = false) {
  console.log('datadatadatadatadatadatadata',method);
  wx.showLoading({mask: true});
  return new Promise((resolve , reject)=> {
    var userInfo = wx.getStorageSync('userInfo')
    console.log(Object.assign({'content-type':'application/x-www-form-urlencoded'},userInfo ? { Authorization: userInfo.id }: {}));
      wx.request({
          url: isWxUrl? beaseUrlWx + url: beaseUrl + url,
          data,
          header: Object.assign({'content-type':'application/x-www-form-urlencoded'},userInfo ? { Authorization: userInfo.id }: {}),//{'content-type':'application/x-www-form-urlencoded'},//Object.assign({'content-type':'application/json'},userInfo ? {Authorization: + userInfo.id}: {}),
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