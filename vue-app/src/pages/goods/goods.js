
import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false ;
Vue.prototype.$http = axios
let {id} = qs.parse(location.search.substr(1))

new Vue({
  el: '#app',
  data:{
    lists: null,
    deals: null,
    inactive: true
  },
  components: {

  },
  methods: { 
    getLists(){
      this.$http.get('http://rap2api.taobao.org/app/mock/7058/goods/details',{id})
        .then(rep =>{ 
          this.lists = rep.data.data
        })
        .catch(err=>{
          console.log(err)
        })    
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
