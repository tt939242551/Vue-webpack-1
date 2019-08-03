
import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios

new Vue({
  el: '.container',
  data:{
    lists: null,
  },
  computed: {
    allSel:{
      get(){
        if(this.lists && this.lists.length){
          return this.lists.every(shop => {
            return shop.checked
          })
        }
         return false
      },
      set(newVal){
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(ele=>{
            ele.checked = newVal
          })
        })
      }
    }
  },
  methods: { 
    getLists(){
      this.$http.get('http://rap2api.taobao.org/app/mock/7058/cart/list')
        .then(rep =>{  
            let lists = rep.data.cartList;
            lists.forEach(element => {
              element.goodsList.forEach(ele=>{
                ele.checked = false
              })
            })
            this.lists = lists
         })
        .catch(err=>{
          console.log(err)
        })    
    },
    changeCheck(shop,e){
      e.checked = !e.checked
      shop.checked = shop.goodsList.every(function(elem){
        return elem.checked;
      })
    },
    changeShop(shop){
    shop.checked = !shop.checked
    shop.goodsList.forEach(ele=>{
      ele.checked = shop.checked
    })
    },
    checkAll(){
      this.allSel = !this.allSel
    }
  },
  created() {
    this.getLists()
  },
  filters:{
    Price(a){
      a = a + ''
      var arr = a.split(".")
      if (!arr[1]) {
        return a.concat(".00")
      } else if (arr[1].length===1) {
        return a.concat("0")
      } else  {
        return a
      }  
    }
  }
})