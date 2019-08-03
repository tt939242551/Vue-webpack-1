
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
    allSel: false,
    total: 0
  },
  computed:{
    selLists(){
      if(this.lists&&this.lists.length){
        let arr = []
        let total = 0
        this.lists.forEach(shop=>{
          shop.goodsList.forEach(goods=>{
            if(goods.checked){
              arr.push(goods)
              total += goods.price * goods.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    }
  },
  methods: { 
    getLists(){
      this.$http.get('http://rap2api.taobao.org/app/mock/7058/cart/list')
        .then(rep =>{  
            let lists = rep.data.cartList;
            lists.forEach(element => {
              element.editing = false
              element.msg = '编辑'
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
      this.allSel = this.lists.every(shop=>{
        return shop.checked
      })
    },
    changeShop(shop){
    shop.checked = !shop.checked
    shop.goodsList.forEach(ele=>{
      ele.checked = shop.checked
    })
    this.allSel = this.lists.every(shop=>{
      return shop.checked
    })
    },
    checkAll(){
      this.allSel = !this.allSel
      this.lists.forEach(shop => {
        shop.checked = this.allSel
        shop.goodsList.forEach(ele=>{
          ele.checked = this.allSel
        })
      })
    },
    edit(shop,index){
      shop.editing = !shop.editing
      shop.msg = shop.editing? '完成' : '编辑'
      this.lists.forEach((item,i)=>{
        if(index !==i ){
          item.editing = false
          item.msg = shop.editing? '' : '编辑'
        }
      })
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