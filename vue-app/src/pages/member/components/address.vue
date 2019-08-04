<template> 
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block"
    v-for="list in lists"
    :key="list.id"
    >
        <a class="block-item js-address-item address-item " href="javascript:;">
          <div class="address-title">{{list.name}} {{list.tel}}</div>
          <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}} </p>
          <router-link :to="{name:'from',params:{type:'edit',addressList:list}}" 
          class="address-edit">修改</router-link>
        </a>
    </div>
    <div class="block stick-bottom-row center">
        <router-link :to="{name:'from',params:{type:'add'}}" 
        class="btn btn-blue js-no-webview-block js-add-address-btn">
              新增地址
        </router-link>
    </div>
  </div>    
</template>

<script>
export default {
  data() {
    return {
      lists:null
    }
  },
  created(){
    this.$http.get('http://rap2api.taobao.org/app/mock/7058/address/list')
    .then(rep=>{
      this.lists = rep.data.lists
    })
  }
}
</script>

<style scoped>
 @import './address_base.css';
 @import './address.css';
</style>
