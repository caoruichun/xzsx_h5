// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'swiper/dist/css/swiper.min.css'
import echarts from 'echarts'
Vue.prototype.$http = axios;

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false;
let HOSt = 'https://fengli.zhengan001.com'
Vue.prototype.HOSt = HOSt
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
