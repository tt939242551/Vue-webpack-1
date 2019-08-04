import router from 'vue-router'
import Vue from 'vue'
import member from '../components/member'
import address from '../components/address'
import From from '../components/from'

Vue.use(router) 

export default new router({
  routes:[{
    path:'/',
    component: member,
  },{
    path:'/address',
    component: address,
  },{
    path:'/from',
    name:'from',
    component: From,
  }]
  })
