const common = require("../../utils/common")
Page({
  onLoad: function () {
    this.setData({
      weekDayStart: common.weekDay(common.getNowDate()),
      weekDayEnd: common.weekDay(common.addDate(common.getNowDate(),+1)),
      countDay: 1,// 显示周几
      startDate: common.getNowDate(),
      endDate: common.addDate(common.getNowDate(),+1),
      startDateAddOne: common.addDate(common.getNowDate(),+1),
    })
  },
  data: {
    isAgree: true, // 勾选是否同意协议
    startDate: '',
    endDate: '',
    endStartDate: '', // 租结束日期的初始化不能大于 选中日期的开始日期
    isLogin: false, // 默认未登录
    userInfo: [],
    userName: '张三',
  }, // 私有数据，可用于模板渲染
    setUserName: function(){
      this.setData({
        userName: '李四'
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 获取选中的开始日期
    bindDateChange: function(e) {
      this.setData({
        startDate: e.detail.value,
        weekDayStart: common.weekDay(e.detail.value),
        startDateAddOne: common.addDate(e.detail.value,1) // 结束日期为 选中的下一天
      })
    },
     // 获取选中的开始日期
     bindDateEndChange: function(e) {
      this.setData({
        endDate: e.detail.value,
        weekDayEnd: common.weekDay(e.detail.value),
        countDay: common.dateDiff(this.data.startDate, e.detail.value)
      })
    },
    toggleChecked:function(e){
      this.setData({
        isAgree: !this.data.isAgree
      })
    },
    showPayAmout: function(e) {
      console.log('弹出支付弹框');
    },
  
})
