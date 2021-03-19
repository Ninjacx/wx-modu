import {_request} from '../../request/request'
/* ******** 
 登录相关接口
 ********  */
// 登录第一步  code 换取key
const step1 = data => {
	return _request({
		url: '/wechat/getUserPhoneStepOne',
		method: 'get',
		data
	})
}
// 登录第二步 根据用户点击成功后返回的参数传入
const step2 = data => {
	return _request({
		url: '/wechat/getUserPhoneStepTwo',
		method: 'get',
		data
	})
}
// 用戶登录接口
const login = data => {
	return _request({
		url: '/wechat/login',
		method: 'post',
		data
	})
}

module.exports =  {
	step1,
	step2,
	login
}