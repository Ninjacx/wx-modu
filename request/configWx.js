  const appId = 'wx5fd2edf0d4018e96' // 小程序appId
  var beaseUrl = 'https://devwx.tranderpay.com/wechat/v1/wx/user/'
  const version = __wxConfig.envVersion;
  switch (version) {
    case 'develop':
      beaseUrl ="https://devwx.tranderpay.com/wechat/v1/wx/user/"; //开发版
      // beaseUrl ="http://172.16.19.187:8080/wechat/v1/wx/user/"; //开发版
      break;
    case 'trial':
      beaseUrl = "https://devwx.tranderpay.com/wechat/v1/wx/user/"; //体验版
      break;
    case 'release':
      beaseUrl = "https://devwx.tranderpay.com/wechat/v1/wx/user/"; //线上地址
      break;
    default:
      beaseUrl = "https://devwx.tranderpay.com/wechat/v1/wx/user/";
      break;
  }
// const beaseUrlWx = 'http://172.16.19.187:8080/wechat/v1/wx/user/' + appId // 惠清
const beaseUrlWx = beaseUrl + appId // 线上地址
//文件地址拼接
// const imgUrlHost = beaseUrl.indexOf('.com') !== -1 ? beaseUrl.split('.com')[0] + '.com/tranderpayfiles' : beaseUrl.split(':8888')[0] + '/tranderpayfiles'
module.exports = {
  beaseUrlWx
  // imgUrlHost
}