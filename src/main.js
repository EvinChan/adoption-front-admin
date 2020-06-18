import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

//CSS重置
import 'normalize.css/normalize.css'
//全局CSS
import '@/styles/index.scss'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { locale })

//QS转换json
import qs from "qs";
Vue.prototype.$qs = qs;

import '@/icons'
import '@/permission'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
