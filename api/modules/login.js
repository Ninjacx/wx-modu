import {_request} from '../../request/request'
/* ******** 
 登录相关接口
 ********  */
// 登录第一步  code 换取key
const stepOne = data => {
	return _request({
		url: '/login',
		method: 'get',
		data
	},true)
}
// 登录第二步 根据用户点击成功后返回的参数传入
const stepTwo = data => {
	return _request({
		url: '/info',
		method: 'get',
		data
	},true)
}
// 
const wx_phoneNoUserCheck = data => {
	return _request({
		url: '/phoneNoUserCheck',
		method: 'get',
		data
	},true)
}

// 用户登录
const wxMaLogin = data => {
	return _request({
		url: '/auth/wxMaLogin',
		method: 'post',
		data
	})
}

const Info = data => {
	return _request({
		url: '/menu/getMenu',
		method: 'get',
		data
	})
}

// 首页 工资单
const clientPayslipConfig = data => {
	return _request({
		url: '/clientPayslipConfig/findCyCleAndSumSubject',
		method: 'get',
		data
	})
}
// 首页初始化 根据openid 获取是否已经绑定过手机号，来判断是否需要再次授权
const getWxMaPhone = data => {
	return _request({
		url: '/auth/getWxMaPhone',
		method: 'post',
		data
	})
}
const updateClientUserPhone = data => {
	return _request({
		url: '/clientUser/updateClientUserPhone',
		method: 'post',
		data
	})
}


module.exports =  {
	stepOne,
	stepTwo,
	getWxMaPhone,
	wx_phoneNoUserCheck,
	wxMaLogin,
	Info,
	clientPayslipConfig,
	updateClientUserPhone
}