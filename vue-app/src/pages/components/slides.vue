<template>
   <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(list,index) in slists" :key="index">
        <a :href="list.clickUrl">
          <img :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'


export default {
  name:'Swiper',
  data() {
    return {
      slists:this.lists
    }
  },
  props:['lists'],
  mounted(){
    new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
    delay: 3000,
    }
  })
  }
};
</script>

<style>
.swiper-container {
    width: 100%;
    height: 100%;
}
</style>
