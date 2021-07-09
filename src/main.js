import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI, { Form } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import BaseTable from '@/components/BaseTable';

import '@/icons' // icon
import '@/permission' // permission control
//引入js

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.config.productionTip = false

// 组件自己封装的公用组件
Vue.component('base-table', BaseTable);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
