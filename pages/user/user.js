import API from '../../api/index'
import {getUserInfo} from '../../utils/common'
import { userDoc, userOrder, userPublish, userNeedList, userPublicDoc, publish, adviceFeedBack, needPublish, htmlView } from '../../utils/Router'
import { toNav } from '../../utils/common'
var app = getApp();  //获取app.js
// import {area,carNumberType, carType} from '../../../utils/commonData'
Page({
  onLoad() {
     if(!getUserInfo()){
        wx.login({
          success :(res) => {
            this.setData({wxLoginResCode: res.code})
          }
        })
     }else{
      this.setData({isLogin: false})
      // 根据最新的数据获取是否显示菜单
      API.getFindOneUser({}).then((res)=>{
        this.setData({
          userInfo: res.data
         })
      })
     
     }
    },
    hide () { },
    resize () { },
  data: {
    wxLoginResCode: '',
    isLogin: true, // 默认未登录
    userInfo: [], // 用户信息
    userName: '张三',
  }, // 私有数据，可用于模板渲染
    // 获取手机号
  getPhoneNumber (e) {
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      var {encryptedData,iv} = e.detail
      API.step1({code: this.data.wxLoginResCode}).then((Step1res)=>{
        console.log('Step1res', Step1res);
        // this.setData({ OpenidSessionKeyParams: res })
        API.step2({ sessionKey: Step1res.data.session_key, encryptedData, iv }).then((res)=>{
          // Step1res.data.openid
          // res.data.phoneNumber
          API.login({ openId: Step1res.data.openid, phoneNumber: res.data.phoneNumber}).then((res)=>{
            if(res.code === 200){
              // 记录登录时间，每次进入app.js 查到缓存时间，超过1天则清空userInfo 缓存
              var date = new Date().getTime()
              console.log('datre',date);
              // 直接赋值
              this.setData({
                userInfo: res.data,
                isLogin: false
              })
              wx.setStorageSync('userInfo', res.data) || ''
            }
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          })
        })
      })
      // console.log('encryptedData,iv',encryptedData,'--------------',iv);
      // // 掉接口 获取 用户的手机号
      //     // 拿到code 此处要再次调用接口获取后台的openid 
      //     API.stepOne({code: this.data.wxLoginResCode}).then(res1=>{
      //       this.setData({ OpenidSessionKeyParams: res1 })
      //            // 获取手机号成功之后
      //         API.wx_phoneNoUserCheck({'openId': this.data.OpenidSessionKeyParams.openid, 'encryptedData': encryptedData,'iv': iv,'sessionKey': this.data.OpenidSessionKeyParams.sessionKey}).then(res=>{
      //           this.setData({
      //               isGetPhone: true,
      //               userAutoPhone: res
      //           })
      //             this.logins()
      //         })
      //     })
    }
  },
    // 跳转发布页面
    publish: function(){
      toNav(publish)
    },
    to_adviceFeedBack: function(){
      toNav(adviceFeedBack)
    },
    to_needPublish: function(){
      toNav(needPublish)
    },
    to_userNeedList: function(){
      toNav(userNeedList)
    },
    // 推广合作
    cooperate(params){
      toNav(htmlView,'type=html&id=5')
    },
    setUserName: function(){
      this.setData({
        userName: '李四'
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    toLogin(e){
      // wx.navigateTo({
      //   url: '/pages/login/login?index='+ e.currentTarget.dataset.index
      // })
      // 直接跳转login 登录页面
    },
    to_member(){
      wx.navigateTo({
        url: '/pages/userMenu/member/member'
      })
    },
    // 拨打电话
    callPhone(){
      wx.makePhoneCall({
        phoneNumber: '18121118073' //仅为示例，并非真实的电话号码
      })
    },
    // to_historyOrder(){
    //   toNav(historyOrder)
    // },
    // 我的车辆
     to_userPublish(){
      toNav(userPublish)
    },
    to_faq(){
      wx.navigateTo({
        url: '/pages/webView/webView?type=faq'
      })
    },
    // 我的租车
    to_userOrder() {
      toNav(userOrder)
    },
    // 我的资料（租车资料）
    to_userDoc() {
      toNav(userDoc)
    },
    // 出借资料
    to_userPublicDoc(){
      toNav(userPublicDoc)
    }
})
