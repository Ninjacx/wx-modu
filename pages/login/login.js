//index.js
//获取应用实例
import API from '../../api/index'
const app = getApp();
const util = require("../../utils/util.js");
Page({
  data: {
    userAutoPhone: '',
    isGetPhone: false, // 是否获取过了手机号，这个需要调接口 根据openid 去查
    dialogShow: false, // 选择显示选择手机的弹框
    payslip: {
      showPayroll: false, // 是否显示工资单
      num1: '',
      num2: ''
    },
    items: [
      {value: '0', name: ''},
      {value: '1', name: '', checked: 'true'}
    ],
    buttons: [{text: '确定'}],
    OpenidSessionKeyParams: {}, // 拿到openid 等参数 去获取手机号
    eyesShow: false,
    userName: '',
    password: '',
    isLoginFlag: true, // 是否登录的标识，未登录为true 否则false
    userInfo: {},
    payrollMonth:'',//薪资周期时间
  },
  onLoad: function () {
    
  },
  radioChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    console.log('items',items);
  },
  // 登录按钮不需要授权手机号
  userLogin:function(){
    this.logins()
  },
  // 眼睛切換是否金额
  toggleEyes:function(){
    this.setData({
      eyesShow: !this.data.eyesShow
    })
  },
  // setBarBlue(){
  //   wx.setNavigationBarColor({
  //     frontColor: '#ffffff',
  //     backgroundColor: '#2e98ff',
  //   })
  // },
  // setBarWhite(){
  //   wx.setNavigationBarColor({
  //     frontColor: '#ffffff',
  //     backgroundColor: '#ffffff',
  //   })
  // },
  // 弹框确认，取消事件
  tapDialogButton(e) {
      // 跳转首页需要改变顶部为白色
      API.clientPayslipConfig({}).then(res=>{
        // - --------
        // this.updatePhone(this.data.userInfo)
        // this.setBarWhite()
        // console.log('res.data.value',res.data.value);
        // if (res.data.value === '1') {
          var date = '无'
          if(res.data.payrollStartDay && res.data.payrollEndDay){
            var dayStart = util.getNewDate(res.data.payrollStartDay)
            var dayEnd = util.getNewDate(res.data.payrollEndDay)
            date = dayStart.month + 1 +'-'+dayStart.day + '至' + (dayEnd.month + 1) +'-'+dayEnd.day
          }
          this.setData({
            payslip:{
              showPayroll: true,
              num1: res.data.resultValue?res.data.resultValue: 0,
              num2:  date //dayStart.month + 1 +'-'+dayStart.day + '至' + (dayEnd.month + 1) +'-'+dayEnd.day
            }
          })
        // }
      })
      // wx.setNavigationBarTitle({title:'#CCFF66'})
      // 确认 的时候调用接口 并且变成首页
      this.setData({
        isLoginFlag: false
      })
    // 关闭弹框
    this.setData({
        dialogShow: false,
    })
},
  onShow: function () {
    
    // if(Boolean(wx.getStorageSync('userInfo'))){
    //    this.getPaySlip()
    // }else{
    //   this.setData({
    //     isLoginFlag: true,
    //   })
    //   // this.setBarBlue()
    //   // 未登录的流程
    //   // 初始化拿到code
    //   this.stepOne()
    // }
  },
  stepOne(){
    wx.login({
      success :(res) => {
        // 拿到code 此处要再次调用接口获取后台的openid 
        API.stepOne({code: res.code}).then(res=>{
          // 拿到openid
          this.setData({ OpenidSessionKeyParams: res })
          // 首页初始化 根据openid 获取是否已经绑定过手机号，来判断是否需要再次授权按钮
          // API.getWxMaPhone({wxMaOpenId: res.openid}).then(res=> {
          //   console.log('resIsHavePhone',res);
          //   this.setData({
          //     userAutoPhone: res.data,
          //     isGetPhone: Boolean(res.data.wxMaPhoneNumber)
          //   })
          // })
        })
      }
    })
  },
  getPaySlip(){
    API.clientPayslipConfig({}).then(res=>{
      if(res.status === 401){
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
        // 没有清除登录信息 
          // this.setBarBlue()
          setTimeout(()=>{
            this.stepOne()
          },500)
          this.setData({
            isLoginFlag: true,
          })
      }else{ // 成功 
        // if (res.data.value === '1') {
          // this.setBarWhite()
          var date = '无'
          if(res.data.payrollStartDay && res.data.payrollEndDay){
            var dayStart = util.getNewDate(res.data.payrollStartDay)
            var dayEnd = util.getNewDate(res.data.payrollEndDay)
            date = dayStart.month + 1 +'-'+dayStart.day + '至' + (dayEnd.month + 1) +'-'+dayEnd.day
          }
          this.setData({
            isLoginFlag: false,
            userInfo: wx.getStorageSync('userInfo').loginInfo,
            payslip:{
              showPayroll: true,
              num1: res.data.resultValue?res.data.resultValue: 0,
              num2: date// dayStart.month + 1 +'-'+dayStart.day + '至' + (dayEnd.month + 1) +'-'+dayEnd.day
            },
            payrollMonth:res.data.payrollMonth
          })
        // }
      }
    })
  },
  // 查看明細
  toDetail(){
    wx.navigateTo({
      url: '/pages/payroll/payroll?payrollMonth='+ this.data.payrollMonth +''
    })
  },
  // 获取手机号
  getPhoneNumber (e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      var {encryptedData,iv} = e.detail
      // wx_phone
      // 掉接口 获取 用户的手机号 this.data.OpenidSessionKeyParams
      // data: {
      //   encryptedData: e.detail.encryptedData,
      //   iv: e.detail.iv,
      //   sessionKey: that.data.session_key,
      //   uid: "",
      // },
      // 获取手机号成功之后
      API.wx_phoneNoUserCheck({openId: this.data.OpenidSessionKeyParams.openid, encryptedData,iv,sessionKey: this.data.OpenidSessionKeyParams.sessionKey}).then(res=>{
        this.setData({
            isGetPhone: true,
            userAutoPhone: res
        })
          this.logins()
      })
      // 
      
    }
  },
  updatePhone(data){
    console.log('datadatadata',data);
    API.updateClientUserPhone({mobile: data.mobile, uid : data.uid}).then(res=>{
                wx.showToast({
                        title: '登录成功',
                        icon: 'none'
                })
            this.setData({
              isLoginFlag: false
            })
    })
  },
  // 登录
  logins(){
    // 判断用户名
    if(!this.data.userName){
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return false
    }
    if(!this.data.password){
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return false
    }
  
    API.wxMaLogin({uname: this.data.userName,pwd: this.data.password,wxMaOpenId: this.data.OpenidSessionKeyParams.openid}).then(resLogin=>{
      if(resLogin.status === 200){
          wx.setStorageSync('token',resLogin.data.token)
          app.globalData.userInfo = resLogin
          API.Info({clientCode: resLogin.data.clientMapList[0].clientCode}).then(res=>{
             console.log('res.data.loginInfo.isBindWxMaPhone',res.data.loginInfo.isBindWxMaPhone);
             console.log('res.data.loginInfo.mobile',res.data.loginInfo.mobile);
             console.log('this.data.userAutoPhone.phoneNumber',this.data.userAutoPhone.phoneNumber);

              wx.setStorageSync('userInfo', res.data)
              this.setData({userInfo: res.data.loginInfo})
              // 登录成功手机一致则不需要弹框让用户选择  res.data.loginInfo.mobile == this.data.userAutoPhone.wxMaPhoneNumber 未绑定
              if(res.data.loginInfo.isBindWxMaPhone === 0 && res.data.loginInfo.mobile == this.data.userAutoPhone.phoneNumber){
                this.updatePhone(res.data.loginInfo)
              }else if(res.data.loginInfo.isBindWxMaPhone === 0 && (res.data.loginInfo.mobile != this.data.userAutoPhone.phoneNumber)){ // 不一致的手机号则让用户选择弹框中的手机号作为默认手机号接口
               console.log('this.data.userAutoPhone.wxMaPhoneNumber',this.data.userAutoPhone.phoneNumber);
                // 弹框选择手机号
                this.setData({
                  items:[
                      {value: '0', name: res.data.loginInfo.mobile, checked: 'true'},
                      {value: '1', name: this.data.userAutoPhone.phoneNumber}
                  ],
                  dialogShow: true
                })
                return false
              }else{ // 当绑定过 且手机号一样就不弹框
                this.updatePhone(res.data.loginInfo)
              }
              this.getPaySlip()
              // console.log('this.OpenidSessionKeyParams',this.data.OpenidSessionKeyParams);
          })
            
            // 登录成功以后 弹框
            
            // 变为首页
            // // this.getPaySlip()
            // this.setData({
            //   isLoginFlag: false
            // })
      }else{
        wx.showToast({
            title: resLogin.message,
            icon: 'none'
        })
      }
      
     
        // 直接跳转工资单页面
        // wx.navigateTo({
        //     url: '/pages/logs/logs'
        // })
    })
  },
  // 绑定input 的值
  updateInputValue(e){
    this.data[e.currentTarget.dataset.inputkey] = e.detail.value;
  },
})