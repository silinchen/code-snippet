// miniprogram/pages/index/index.js
const app = getApp()
Page({
  getPhoneNumber (e) {
    console.log(e.detail)
    // 通过云函数，获取手机号明文
    wx.cloud.callFunction({
      name: 'getPhoneNumber',
      data: {
        // e.detail.cloudID 开通云开发的环境下，才会返回这个
        // 使用 wx.cloud.CloudID() 包装后，作为顶层参数上传
        cloudID:wx.cloud.CloudID(e.detail.cloudID)
      },
      success: res => {
        console.log('res', res)
        const phoneNumber = res.result.cloudID.data.phoneNumber
        console.log(phoneNumber)
      }
    })
  }
})