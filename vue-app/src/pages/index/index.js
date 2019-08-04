
import '../../modules/css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import {InfiniteScroll} from 'mint-ui';
import componentFooter from '../components/footer1.vue'
import Slides from '../components/slides.vue'

Vue.use(InfiniteScroll);

new Vue({
  el: '#app',
  data:{
    lists: null,
    pageNum: 1,
    loading: false,
    allLoading: false,
    bannerLists:null
  },
  components: {
    componentFooter,Slides
  },
  methods: {
    getLists(){
      if (this.allLoading) return
      if (this.loading) {
          return
         } else {
      this.loading = true
      axios.get('http://rap2api.taobao.org/app/mock/7058/index/hotLists',{
        params:{
          pageNum: this.pageNum,
          pageSize:6
        }
      })
      .then(rep =>{    
        if (this.lists) {
          this.lists = this.lists.concat(rep.data.lists)
        } else {
          this.lists = rep.data.lists 
        } 
        this.loading = false
        this.pageNum++
        if(rep.data.lists.length < 6){
         this.allLoading = true
        }
      })
      .catch(err=>{
        console.log(err)
      })
     }   
    },
    getBanner(){
      axios.get('http://rap2api.taobao.org/app/mock/7058/index/banner')
      .then(rep=>{
       this.bannerLists = rep.data.lists
      })  
    }
  },
  created() {
    this.getLists()
    this.getBanner()
  },
})
