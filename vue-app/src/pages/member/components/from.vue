

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
              <select class="js-province-selector">
                <option value="-1">选择省份</option>
                <option value="110000">北京市</option>
               
              </select>
              <select class="js-city-selector">
                <option value="-1">选择城市</option>
                <option value="440100">广州市</option>
               
              </select>
              <select class="js-county-selector" name="area_code" data-code="440402">
                <option value="-1">选择地区</option>
                <option value="440402">香洲区</option>
              </select>
            </div>
          </div>
          <div class="block-item">
            <label>详细地址</label>
            <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
          </div>
        </div>
      </div>
      <div class="block section js-save block-control-btn">
        <div class="block-item c-blue center">保存</div>
      </div>
      <div v-show="type==='edit'" class="block section js-delete block-control-btn">
        <div class="block-item c-red center">删除</div>
      </div>
      <div v-show="type==='edit'" class="block stick-bottom-row center js-save-default">
        <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      address: "",
      cityValue: "",
      districtValue: "", 
      id: '',
      isDefault: null,
      name: "",
      provinceValue: '',   
      tel: '',
      type : this.$route.params.type,
      list : this.$route.params.addressList
    }
  },
}
</script>

<style scoped>
 @import './address_base.css';
 @import './address.css';
</style>

