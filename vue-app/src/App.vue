<template>
  <div id="app">
    <h1><router-link to="/helloworld">HELLO WORLD</router-link></h1>
    <h2><router-link :to="{
    name: 'hello',
    params: yyy,
    }">HELLO</router-link></h2>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data :function(){
    return{
   yyy:{xxxx:'我是hello传过来的参数'}
    }
  },
  components: {
 
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
