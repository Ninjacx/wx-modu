const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const getNewDate = data => {
	const date = new Date(data)
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	return { year, month, day }
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 省份证/银行卡 密文显示
 */
const setIdCard =(idNumber)=> {
	var getCard = String(idNumber)
		.replace(/\s/g, '')
		.replace(/^(\w{2})\d+(\w{2})$/, '$1 ****** $2')
	return getCard
}
const token = function () {//token封装
  if (wx.getStorageSync('_USERINFO')) {
    return wx.getStorageSync('_USERINFO').accessToken
  } else {
    return '';
  }
}
const request = (url, options) => { //请求封装
  return new Promise((resolve, reject) => {
    // if (token()) {
    //   var header = {
    //     'Authorization': 'Bearer ' + token(),
    //   }
    // } else {
      var header = {
        'Content-Type': 'application/json'
      }
    // }
   
    wx.request({
      url:url.url,
      method: options.method,
      data: url.data,
      header: header,
      success(request) {
        console.log('request',request)
        resolve(request)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
const gets = (url, options) => {//get请求
  return request(url, {
    method: 'GET'
  })
}
const post = (url, options, token) => {//post请求
  return request(url, {
    method: 'POST'
  })
}
const numFormat = (amount, place) => {
	// 千分位加逗号
	const places = place || 2
	let defaultAmount = ''
	const setAmount = amount

	if (setAmount !== null && setAmount !== '' && setAmount !== undefined && setAmount !== '--') {
		defaultAmount = Number(setAmount)
			.toFixed(places)
			.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
		return defaultAmount
	} else {
		return defaultAmount
	}
}
module.exports = {
  formatTime: formatTime,
  request,
  gets,
  post,
  getNewDate,
  setIdCard,
  numFormat
}
