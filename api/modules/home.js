import {_request} from '../../request/request'
/* ******** 
 登录相关接口
 ********  */
// 牌照类型
const getLicensePlate = data => {
	return _request({
		url: '/wechat/getLicensePlate',
		method: 'get',
		data
	})
}
// 出租类目菜单
const getType = data => {
	return _request({
		url: '/wechat/getType',
		method: 'get',
		data
	})
}
// 列表
const getTypePublishData = data => {
	return _request({
		url: '/wechat/publishData',
		method: 'get',
		data
	})
}
module.exports =  {
	getLicensePlate,
	getType,
	getTypePublishData
}