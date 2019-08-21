import '../../modules/css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import Velocity from 'velocity-animate'
import mixin from '../../modules/js/mixin'

let param = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data:{
    goTop: false,
    lists: null,
    keyword: param.keyword,
    init:false,
  },
  components: {

  },
  methods: { 
    getLists(){
      axios.get('//rap2api.taobao.org/app/mock/7058/search/list',{keyword:this.keyword,id:param.id})
        .then(rep =>{  
          this.init = true 
          if (this.lists) {
            this.lists = this.lists.concat(rep.data.lists)
          } else {
            this.lists = rep.data.lists 
          } 
        })
        .catch(err=>{
          console.log(err)
        })    
    },
    move(){
      if(window.scrollY
        > 200){
        this.goTop = true
      } else {
        this.goTop = false
      }
    },
    gotoTop(){
      Velocity(document.body,'scroll',{duration: 1000})
      this.goTop = false
    }
  },
  created() {
    this.getLists()
  },
  mixins: [mixin]
})
