import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式文件
import '@/assets/css/global.css'
// 导入elementUI模块
import ElementUI from 'element-ui'

// 导入axios模块
import axios from 'axios'
// 注册全部的组件和事件方法
Vue.use(ElementUI)
// 配置公共根地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 配置为vue的(原型)继承成员
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
