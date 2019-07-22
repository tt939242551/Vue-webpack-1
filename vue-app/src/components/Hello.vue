<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h2>{{$route.params.xxxx}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      msg: '我是组件Hello'
    }
  }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

</style>
