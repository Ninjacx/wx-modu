const common = require("../../utils/common")
import {beaseUrl} from '../../request/config'
import API from '../../api/index'
Page({
  onLoad: function (params) {
    console.log('params',params);
    API.publishDetailOne({publishId: params.publishId}).then(res => {
      this.setData({
        pageData: res.data
      })
      this.setPayMoney()
    })
    // return false
    this.setData({
      weekDayStart: common.weekDay(common.getNowDate()),
      weekDayEnd: common.weekDay(common.addDate(common.getNowDate(),+1)),
      // countDay: 1,// 显示周几
      initDate: common.getNowDate(),
      startDate: common.getNowDate(),
      endDate: common.addDate(common.getNowDate(),+1),
      startDateAddOne: common.addDate(common.getNowDate(),+1),
    })
  },
  data: {
    beaseUrl: beaseUrl,
    pageData: [], // 展示参数
    countDay: 1,
    needPayMoney: 0, // 需支付金额
    startTime: '7:00',
    endTime: '7:00',
    isMoto: true,
    isAgree: true, // 勾选是否同意协议
    initDate: '',
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
    bindTimeEndChange: function(e) {
      this.setData({
        endTime: e.detail.value
      })
    },
    bindTimeChange: function(e) {
      this.setData({
        startTime: e.detail.value
      })
    },
    // 获取选中的开始日期
    bindDateChange: function(e) {
      this.setData({
        startDate: e.detail.value,
        weekDayStart: common.weekDay(e.detail.value),
        startDateAddOne: common.addDate(e.detail.value,1) // 结束日期为 选中的下一天
      })
      this.setPayMoney()
    },
     // 获取选中的开始日期
     bindDateEndChange: function(e) {
      this.setData({
        endDate: e.detail.value,
        weekDayEnd: common.weekDay(e.detail.value),
        countDay: common.dateDiff(this.data.startDate, e.detail.value)
      })
      this.setPayMoney()
    },
    toggleChecked:function(e){
      this.setData({
        isAgree: !this.data.isAgree
      })
    },
    // 计算需支付金额
    setPayMoney: function(){
      this.setData({
        needPayMoney: this.data.countDay * this.data.pageData.rent_day
      })
    },
    WxPayMent: function(e) {
      var {publishId} = this.data.pageData
      var {startTime, countDay, startDate} = this.data
      // 支付成功，生成订单
      API.addOrder({publishId, countDay,startDate,startTime}).then(res => {
        // this.setData({
        //   pageData: res.data
        // })
      })
      return false
    //   var str =  "appid=wxd930ea5d5a258f4f&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
    //  var stringSignTemp=str+"&key=192006250b4c09247ec02edce69f6a2d"
    //   var sign= stringSignTemp
  //  var  paySign = wx.MD5('appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111') // = 22D9B4E54AB1950F51E0649E8810ACD6
     wx.requestPayment(
        {
        'timeStamp': '1615428678',
        'nonceStr': '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
        'package': 'wx2017033010242291fcfe0db70013231072',
        'signType': 'MD5',
        'paySign': '4ab1950f51e0649e',
        'success':function(res){
          console.log('res',res);
        },
        'fail':function(res){
          console.log('resF',res);
        },
        'complete':function(res){}
        })
    },
  
})
