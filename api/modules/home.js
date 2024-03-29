import {_request} from '../../request/request'
/* ******** 
 相关接口
 ********  */
// 牌照类型
const getLicensePlate = data => {
	return _request({
		url: '/wechat/getLicensePlate',
		method: 'get',
		data
	})
}
// 轮播图
const getBanner = data => {
	return _request({
		url: '/wechat/getBanner',
		method: 'get',
		data
	})
}
// 获取富文本编辑的菜单
const getHtmlView = data => {
	return _request({
		url: '/wechat/getHtmlView',
		method: 'get',
		data
	})
}
// 上海区 
const getRegion = data => {
	return _request({
		url: '/wechat/getRegion',
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
// 发布列表
const publishDataList = data => {
	return _request({
		url: '/wechat/publishDataList',
		method: 'get',
		data
	})
}
// 推荐的列表
const recommendList = data => {
	return _request({
		url: '/wechat/recommendList',
		method: 'get',
		data
	})
}
// 积分签到
const IntegralSignIn = data => {
	return _request({
		url: '/wechat/IntegralSignIn',
		method: 'post',
		data
	})
}

// 需求列表
const getDemand = data => {
	return _request({
		url: '/wechat/getDemand',
		method: 'get',
		data
	})
}

// 详情
const publishDetailOne = data => {
	return _request({
		url: '/wechat/publishDetailOne',
		method: 'get',
		data
	})
}
module.exports =  {
	getBanner,
	getHtmlView,
	getDemand,
	getLicensePlate,
	getType,
	getRegion,
	publishDataList,
	recommendList,
	publishDetailOne,
	IntegralSignIn
}