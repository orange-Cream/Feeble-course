// 独立文件，用于存储axios相关代码
// 引入json-bigint模块
import JSONbig from 'json-bigint'

// 导入Vue模块
import Vue from 'vue'

// 导入axios模块
import axios from 'axios'
// 配置公共根地址(线上地址)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为Vue的继承成员
Vue.prototype.$http = axios

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // 发送请求的相关逻辑
  // config:对象  与 axios.defaults 相当
  // 借助config配置token
  const userInfo = window.sessionStorage.getItem('userInfo')
  // 判断token存在再做配置
  if (userInfo) {
    const token = JSON.parse(userInfo).token
    // 注意：token前边有 'Bearer ' 的信息前缀
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 服务器端返回，数据转换器，应用
axios.defaults.transformResponse = [function (data) {
  // data的返回形式有两种
  // 1. 实体字符串
  // 2. 空字符串(不能转的)
  // JSONbig.parse针对大整型进行处理，其他信息不给处理
  if (data) {
    return JSONbig.parse(data)
  }
  return data
}]
