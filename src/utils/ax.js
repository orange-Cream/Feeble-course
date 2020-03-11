// 独立文件，用于存储axios相关代码

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
  const userinfo = window.sessionStorage.getItem('userinfo')
  // 判断token存在再做配置
  if (userinfo) {
    const token = JSON.parse(userinfo).token
    // 注意：token前边有 'Bearer ' 的信息前缀
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
