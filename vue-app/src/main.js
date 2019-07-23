// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import rt from './router/index.js'
import axios from 'axios'

Vue.config.productionTip = false ;
Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router: rt,
  components: { App },
  template: '<App/>'
})
