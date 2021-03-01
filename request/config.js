
var beaseUrl = 'https://qa.tranderpay.com/api/v1'
const version = __wxConfig.envVersion;
// const beaseUrl = 'https://dev.tranderpay.com:8888/api/v1'
// const beaseUrl = 'https://qa.tranderpay.com/api/v1'
// const beaseUrl = 'http://172.16.19.187:8888/api/v1' 惠青ip
// const beaseUrl = 'http://172.16.19.155:8888/api/v1' 孙悦ip
// const beaseUrl = 'http://172.16.19.187:8888/api/v1'
// const beaseUrl = 'http://172.16.19.155:8888/api/v1'
switch (version) {
  case 'develop':
    beaseUrl ="http://172.16.19.187:8888/api/v1"; //开发版
    // beaseUrl ="https://qa.tranderpay.com/api/v1"; //开发版
    // beaseUrl ="http://172.16.19.220:8888/api/v1"; //开发版
    break;
  case 'trial':
    beaseUrl = "https://qa.tranderpay.com/api/v1"; //体验版
    break;
  case 'release':
    beaseUrl = "https://qa.tranderpay.com/api/v1"; //线上地址
    break;
  default:
    beaseUrl = "https://qa.tranderpay.com/api/v1";
    break;
}

//文件地址拼接
const imgUrlHost = beaseUrl.indexOf('.com') !== -1 ? beaseUrl.split('.com')[0] + '.com/tranderpayfiles' : beaseUrl.split(':8888')[0] + '/tranderpayfiles'
module.exports = {
  beaseUrl,
  imgUrlHost
}