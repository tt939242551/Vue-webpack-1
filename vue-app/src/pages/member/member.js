
import Vue from 'vue'
import rt from './router/index.js'
import axios from 'axios'

Vue.config.productionTip = false ;
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router: rt,
})
