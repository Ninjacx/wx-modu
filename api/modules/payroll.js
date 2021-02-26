import {_request} from '../../request/request'
/* ******** 
 工资单相关接口
 ********  */
// 获取当前年下的工资月
const findSubjectByYear = data => {
	return _request({
		url: '/clientPayslipConfig/findSubjectByYear',
		method: 'get',
		data
	})
}

// 获取当前月下的工资单
const getIsGroupByMonthMiniProgram = data => {
	return _request({
		url: '/clientPayslipConfig/isGroupByMonthMiniProgram',
		method: 'get',
		data
	})
}
// 点击某一天获取对应的数据
const getIsGroupFindSubjestMiniProgram = data => {
	return _request({
		url: '/clientPayslipConfig/isGroupFindSubjestMiniProgram',
		method: 'get',
		data
	})
}
// 下载
const exportPdfMiniProgram = data => {
	return _request({
		url: '/clientPayslipConfig/exportPdfMiniProgram',
		method: 'post',
		data
	})
}
// 工资单月比对
const statisticsSubjectMiniProgram = data => {
	return _request({
		url: '/clientPayslipConfig/statisticsSubjectMiniProgram',
		method: 'get',
		data
	})
}
// 年度累计项目
const findBySubjectNumber = data => {
	return _request({
		url: '/clientPayslipConfig/findBySubjectNumber',
		method: 'get',
		data
	})
}

module.exports =  {
  getIsGroupByMonthMiniProgram,
  getIsGroupFindSubjestMiniProgram,
  exportPdfMiniProgram,
  statisticsSubjectMiniProgram,
	findBySubjectNumber,
	findSubjectByYear
}