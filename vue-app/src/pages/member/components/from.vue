

<template>
  <div class="" style="cursor:pointer;">
    <div class="container " style="min-height: 597px;">
      <div class="section section-first">
        <div class="block form js-form">
          <input class="js-id" name="id" type="hidden" v-model="id">
          <div class="block-item" style="border-top:0;">
            <label>收货人</label>
            <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
          </div>
          <div class="block-item">
            <label>联系电话</label>
            <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
          </div>
          <div class="block-item">
            <label>选择地区</label>
            <div class="select-group">
              <select class="js-province-selector" v-model="provinceValue">
                <option value="-1">选择省份</option>
                <option :value="p.value" v-for="p in addressData.list"
                :key="p.value"
                >{{p.label}}</option>
               
              </select>
              <select class="js-city-selector" v-model="cityValue">
                <option value="-1">选择城市</option>
                <option :value="c.value" v-for="c in cityList"
                :key="c.value"
                >{{c.label}}</option>
               
              </select>
              <select class="js-county-selector" name="area_code" v-model="districtValue">
                <option value="-1">选择地区</option>
                <option :value="d.value" v-for="d in districtList"
                :key="d.value"
                >{{d.label}}</option>
              </select>
            </div>
          </div>
          <div class="block-item">
            <label>详细地址</label>
            <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
          </div>
        </div>
      </div>
      <div @click="add" class="block section js-save block-control-btn">
        <div class="block-item c-blue center">保存</div>
      </div>
      <div v-show="type==='edit'" @click="removeAddress" class="block section js-delete block-control-btn">
        <div class="block-item c-red center">删除</div>
      </div>
      <div @click="setDefault" class="block stick-bottom-row center js-save-default">
        <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
      </div>
    </div>
  </div>
</template>

<script>
 import addressData from '../../../modules/js/address.json';

export default {
  data() {
    return {
      address: "",
      cityValue: -1,
      districtValue: -1, 
      id: '',
      name: "",
      provinceValue: -1,   
      tel: '',
      type : this.$route.params.type,
      list : this.$route.params.addressList,
      addressData,
      cityList: null,
      districtList : null,
      isDefault : false,
      isInitVal: true,
      provinceName:'',
      cityName:'',
      districtName:'',
    }
  },
  methods: {
    add(){
      let {name,tel,provinceValue,cityValue,districtValue,address,isDefault,provinceName,cityName,districtName,} = this
      let data = {name,tel,provinceValue,cityValue,districtValue,address,isDefault,provinceName,cityName,districtName}
      if (this.type === 'edit') {
        data.id = this.id
        this.$store.dispatch('updateAction', data)
      } else {
        data.id = parseInt(Math.random()*10000)
        this.$store.dispatch('addAction', data)
      }
       setTimeout(()=>{
       this.$router.go(-1)  
      },500)
    },
    setDefault(){
    this.isDefault = true
    this.add()         
    },
    removeAddress(){
      if(window.confirm('确认删除吗?')){
      this.$store.dispatch('removeAction', this.id)
      } 
      setTimeout(()=>{
       this.$router.go(-1)  
      },500)
    }
  },
  created(){
    if(this.type==='edit'){
     this.address = this.list.address , 
     this.id = this.list.id ,
     this.name = this.list.name ,
     this.provinceValue = parseInt(this.list.provinceValue) , 
     this.tel = this.list.tel,
     this.isDefault = this.list.isDefault  
    }
  },
  watch:{
   provinceValue(val){
     if(val === -1) return
     let index = this.addressData.list.findIndex(item => {
       return item.value === val
     })
     this.provinceName = this.addressData.list[index].label
     this.cityList = this.addressData.list[index].children
     this.cityValue = -1
     this.districtValue = -1
     if(this.type==='edit' && this.isInitVal){
       this.cityValue = parseInt(this.list.cityValue) 
     }
   },
   cityValue(val){
     if(val === -1) return
     let index = this.cityList.findIndex(item => {
       return item.value === val
     })
     this.cityName = this.cityList[index].label
     this.districtList = this.cityList[index].children
     this.districtValue = -1

     if(this.type==='edit' && this.isInitVal){
     this.districtValue = parseInt(this.list.districtValue)
     this.isInitVal = false
      }
   },
   districtValue(val){
     if(val === -1) return
     let index = this.districtList.findIndex(item => {
       return item.value === val
     })
     this.districtName = this.districtList[index].label
    }
  },
}
</script>

<style scoped>
 @import './address_base.css';
 @import './address.css';
</style>

