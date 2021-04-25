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
// 发布
const publish = data => {
	return _request({
		url: '/wechat/publish',
		method: 'post',
		data
	})
}
// 下单
const addOrder = data => {
	return _request({
		url: '/wechat/addOrder',
		method: 'post',
		data
	})
}

// 意见反馈
const addAdvice = data => {
	return _request({
		url: '/wechat/addAdvice',
		method: 'post',
		data
	})
}
// 牌照发布。
const publishLicensePlate = data => {
	return _request({
		url: '/wechat/publishLicensePlate',
		method: 'post',
		data
	})
}
const setUserDoc = data => {
	return _request({
		url: '/wechat/setUserDoc',
		method: 'post',
		data
	})
}
// 申请成为商户
const applyMember = data => {
	return _request({
		url: '/wechat/applyMember',
		method: 'post',
		data
	})
}
// 用户订单列表
const getUserOrderList = data => {
	return _request({
		url: '/wechat/getUserOrderList',
		method: 'get',
		data
	})
}
// 我的发布列表
const getUserPublishDataList = data => {
	return _request({
		url: '/wechat/userPublishDataList',
		method: 'get',
		data
	})
}
// 查询单条用户信息
const getFindOneUser = data => {
	return _request({
		url: '/wechat/getFindOneUser',
		method: 'get',
		data
	})
}
module.exports =  {
	step1,
	step2,
	login,
	publish,
	setUserDoc,
	publishLicensePlate,
	addOrder,
	addAdvice,
	getUserOrderList,
	getUserPublishDataList,
	applyMember,
	getFindOneUser
	// uploadFile
}