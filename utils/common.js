// 年月日获取星期
const weekDay = date => {
  var dt = new Date(date.split("-")[0], date.split("-")[1]-1,date = date.split("-")[2]);
  var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return weekDay[dt.getDay()];
}
// 获取当前今天的年月日
const getNowDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
      month = "0" + month;
  }
  if (day < 10) {
      day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}
// 传入日期+ 1天 
const addDate = (date,addDays) => { 
  var d = new Date(date); 
  d.setDate(d.getDate() + addDays); 
  var m = d.getMonth()+1; 
  if (m < 10) {
    m = "0" + m;
  }
  return d.getFullYear()+'-'+m+'-'+d.getDate(); 
}
// 日期相差几天
const dateDiff = (sDate1, sDate2) => {  //sDate1和sDate2是2017-9-25格式 
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
    return iDays
}
const setUserInfo = (data) => { 
  if(data) {
    return wx.setStorageSync('userInfo',data)
  }
}
// 时间戳转时间
var setDataTime = (str) => {
  var n = parseInt(str)*1000;
  var D = new Date(n);
  var year = D.getFullYear();//四位数年份
  var month = D.getMonth()+1;//月份(0-11),0为一月份
  month = month<10?('0'+month):month;
  var day = D.getDate();//月的某一天(1-31)
  day = day<10?('0'+day):day;
  var hours = D.getHours();//小时(0-23)
  hours = hours<10?('0'+hours):hours;
  var minutes = D.getMinutes();//分钟(0-59)
  minutes = minutes<10?('0'+minutes):minutes;
  var now_time = year+'-'+month+'-'+day+' '+hours+':'+minutes;
  return now_time;
}
const getUserInfo = () => { 
  if(wx.getStorageSync('userInfo')){
    return wx.getStorageSync('userInfo')
  }
  return false
}
const clearUserInfo = () => { 
  if(data) {
    return wx.setStorageSync('userInfo','')
  }
}
// const result = (res) => {
//   if(res.code){

//   }
// }
module.exports = {
  weekDay,
  dateDiff,
  getNowDate,
  addDate,
  setUserInfo,
  getUserInfo,
  clearUserInfo,
  setDataTime
}