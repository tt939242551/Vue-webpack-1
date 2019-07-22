import router from 'vue-router'
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld'
import Hello from '../components/Hello'

Vue.use(router) 

export default new router({
  routes:[{
  name: 'helloWorld',
  path:'/helloWorld',//指定要跳转的路径
  component: HelloWorld//指定要跳转的组件
  },{
    name: 'hello',
    path:'/hello',//指定要跳转的路径
    component: Hello//指定要跳转的组件
    }]
  })
