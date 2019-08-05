

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
      <div v-show="type==='edits'" @click="removeAddress" class="block section js-delete block-control-btn">
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
    }
  },
  methods: {
    add(){
      let {name,id,tel,provinceValue,cityValue,districtValue,address} = this
      let data = {name,id,tel,provinceValue,cityValue,districtValue,address}
      if(this.type==="add"){
        this.$http.post('http://rap2api.taobao.org/app/mock/7058/address/add',{data})
        .then(rep=>{
          this.$router.go(-1)
        })
        .catch(err=>{
          console.log(err)
          this.$router.go(-1)
        }) 
      }
      if(this.type==="edits"){
        this.$http.post('http://rap2api.taobao.org/app/mock/7058/address/updata',{data})
        .then(rep=>{
          this.$router.go(-1)
        })
        .catch(err=>{
          console.log(err)
          this.$router.go(-1)
        }) 
      }
    },
    setDefault(){
      this.$http.post('http://rap2api.taobao.org/app/mock/7058/address/setDefault',{id:this.id})
        .then(rep=>{
          this.add()
        })
        .catch(err=>{
          console.log(err)
        }) 
    },
    removeAddress(){
      this.$http.post('http://rap2api.taobao.org/app/mock/7058/address/remove',{id:this.id})
        .then(rep=>{
          this.$router.go(-1)
        })
        .catch(err=>{
          console.log(err)
          this.$router.go(-1)
        }) 
    }
  },
  created(){
    if(this.type==='edit'){
     this.address = this.list.address , 
     this.id = this.list.id ,
     this.name = this.list.name ,
     this.provinceValue = parseInt(this.list.provinceValue) , 
     this.tel = this.list.tel 
    }
  },
  watch:{
   provinceValue(val){
     if(val === -1) return
     let index = this.addressData.list.findIndex(item => {
       return item.value === val
     })
     this.cityList = this.addressData.list[index].children
     this.cityValue = -1
     this.districtValue = -1
     if(this.type==='edit'){
       this.cityValue = parseInt(this.list.cityValue) 
     }
   },
   cityValue(val){
     if(val === -1) return
     let index = this.cityList.findIndex(item => {
       return item.value === val
     })
     this.districtList = this.cityList[index].children
     this.districtValue = -1

     if(this.type==='edit'){
     this.districtValue = parseInt(this.list.districtValue)
     this.type  = 'edits'
      }
   },
  },
}
</script>

<style scoped>
 @import './address_base.css';
 @import './address.css';
</style>

