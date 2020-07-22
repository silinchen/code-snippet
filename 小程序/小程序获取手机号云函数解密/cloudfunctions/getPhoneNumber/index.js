// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event', event)
  // 这里会自动解析使用 wx.cloud.CloudID() 函数包装过的加密数据
  return event
}