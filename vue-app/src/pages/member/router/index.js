import router from 'vue-router'
import Vue from 'vue'
import member from '../components/member'
import address from '../components/address'

Vue.use(router) 

export default new router({
  routes:[{
    path:'/',
    component: member,
  },{
    path:'address',
    component: address,
  }]
  })
