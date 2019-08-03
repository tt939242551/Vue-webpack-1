
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Slides from '../components/slides.vue'

Vue.config.productionTip = false ;
Vue.prototype.$http = axios
let {id} = qs.parse(location.search.substr(1))

new Vue({
  el: '#app',
  data:{
    id,
    lists: null,
    deals: null,
    inactive: true,
    bannerLists :null,
    Actions : 0,
    skuNumber: 1,
    sku: false,
    cart: false,
  },
  components: {
    Slides
  },
  methods: { 
    getLists(){
      this.$http.get('http://rap2api.taobao.org/app/mock/7058/goods/details',{id})
        .then(rep =>{ 
          this.lists = rep.data.data
          this.bannerLists = []
          this.lists.imgs.forEach(element => {
            this.bannerLists.push({
              clickUrl:'',
              img:element
            })
          });
        })
        .catch(err=>{
          console.log(err)
        })    
    },
    changeActive(val){
      this.Actions = val
      document.body.style.overflow = val ? 'hidden':'auto'
      document.documentElement.style.overflow = val ? 'hidden':'auto'
     // document.body.style.height = val ? '100%' :'auto'
     // document.documentElement.style.height = val ? '100%' :'auto'
    },
    changeSku(val){
      if(this.skuNumber || val !== -1){ 
        this.skuNumber =  this.skuNumber + val
      }
    },
    addCart(){
      this.Actions = 0
      if (this.skuNumber) {
      this.$http.post('http://rap2api.taobao.org/app/mock/7058/cart/add',{id,number:this.skuNumber})
      .then(rsp=>{
        if(rsp.data.status===200){
          this.cart = true
          setTimeout(()=>{
            this.sku = true
          },500)
          setTimeout(()=>{
            this.sku = false
          },1500)
        }
      }) 
      }
    },
    sales(){
    this.inactive = false
    this.$http.get('http://rap2api.taobao.org/app/mock/7058/goods/deal',{id})
    .then(rep =>{ 
      this.deals = rep.data.data.lists
    })
    .catch(err=>{
      console.log(err)
    })   
    },
    goods(){
      this.inactive = true
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
