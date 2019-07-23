<template>
  <div id="app">
    <h1><router-link to="/helloworld">HELLO WORLD</router-link></h1>
    <h2><router-link :to="{
    name: 'hello',
    params: yyy,
    }">HELLO</router-link></h2>
    <img src="./assets/logo.png"><br>
    <button @click="getrqs">发送get请求</button>
    <button @click="postrqs">发送post请求</button>
    <router-view></router-view>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'App',
  data :function(){
    return{
   yyy:{xxxx:'我是hello传过来的参数'}
    }
  },
  methods:{ 
     'getrqs': function(){
      this.$http.get('https://cnodejs.org/api/v1/topics',{
        params:{ 
        page:1,
        limit:10}
        })
        .then(function (res) {
        //此处的this指向的不是当前vue实例
        console.log(res.data.data)
        })
        .catch(function (err) {
        console.log(err)
        })
    },
       'postrqs': function(){
      this.$http.post('https://cnodejs.org/api/v1/topics',qs.stringify({
        page:1,
        limit:10
        }))
        .then(function (res) {
        //此处的this指向的不是当前vue实例
        console.log(res.data.data)
        })
        .catch(function (err) {
        console.log(err)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
