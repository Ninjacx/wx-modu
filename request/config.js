
var beaseUrl = 'https://qa.tranderpay.com/api/v1'
const version = __wxConfig.envVersion;
switch (version) {
  case 'develop':
    // beaseUrl ="http://47.98.163.21"; //开发版
    beaseUrl ="http://172.16.19.26";
    // beaseUrl ="http://139.224.131.217";
    // beaseUrl ="http://192.168.1.1";
    // beaseUrl ="http://192.168.1.5";
    // beaseUrl ="http://192.168.0.103";
    // 172.16.19.133
    // beaseUrl ="http://192.168.1.33";
    // beaseUrl ="https://qa.tranderpay.com/api/v1"; //开发版
    // beaseUrl ="http://172.16.19.220:8888/api/v1"; //开发版
    break;
  case 'trial':
    beaseUrl = "http://172.16.19.133"; //体验版
    break;
  case 'release':
    beaseUrl = "http://172.16.19.133"; //线上地址
    break;
  default:
    beaseUrl = "http://172.16.19.133";
    break;
}

//文件地址拼接
const imgUrlHost = beaseUrl+'/upload/'
module.exports = {
  beaseUrl,
  imgUrlHost
}