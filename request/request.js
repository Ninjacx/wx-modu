import {beaseUrl} from './config'
import { toTab } from '../utils/common'
import { user } from '../utils/Router'

// import {beaseUrlWx} from './configWx'
function _request({url , data , method}) {
  wx.showLoading({mask: true});
  return new Promise((resolve , reject)=> {
    var userInfo = wx.getStorageSync('userInfo')
    // console.log('userInfo',userInfo);
    console.log(Object.assign({'content-type':'application/x-www-form-urlencoded'},userInfo ? { Authorization: userInfo.id }: {}));
      wx.request({
          url: beaseUrl + url,
          data,
          header: Object.assign({'content-type':'application/x-www-form-urlencoded'},userInfo ? { Authorization: userInfo.id }: {}),//{'content-type':'application/x-www-form-urlencoded'},//Object.assign({'content-type':'application/json'},userInfo ? {Authorization: + userInfo.id}: {}),
          method: method || 'get',
          success: (res)=>{
            if(res.statusCode === 200){
              if(res.data.code == -2) {
                toTab(user)
                  //解决真机一闪消失问题
                  wx.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000
                  })
                return false
              }
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