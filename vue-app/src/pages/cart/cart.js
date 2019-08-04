import mixin from '../../modules/js/mixin'
import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import Vue from 'vue'
import axios from 'axios'
import Velocity from 'velocity-animate'

new Vue({
  el: '.container',
  data:{
    lists: null,
    allSel: false,
    total: 0,
    editingShop: null,
    removePop: false,
    removeData : null
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
      axios.get('http://rap2api.taobao.org/app/mock/7058/cart/list')
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
      if(this.editingShop){return}
      e.checked = !e.checked
      shop.checked = shop.goodsList.every(function(elem){
        return elem.checked;
      })
      this.allSel = this.lists.every(shop=>{
        return shop.checked
      })
    },
    changeShop(shop){
    if(this.editingShop){return}
    shop.checked = !shop.checked
    shop.goodsList.forEach(ele=>{
      ele.checked = shop.checked
    })
    this.allSel = this.lists.every(shop=>{
      return shop.checked
    })
    },
    checkAll(){
      if(this.editingShop){return}
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
      this.editingShop = shop.editing
    },
    minus(list){
      if(list.number===1){return}
      axios.post('http://rap2api.taobao.org/app/mock/7058/cart/reduce',{id:list.id,number:1})
      .then(rep=>{
        list.number --
      })
    },
    plus(list){
      axios.post('http://rap2api.taobao.org/app/mock/7058/cart/add',{id:list.id,number:1})
      .then(rep=>{
        list.number ++
      })
    },
    remove(shop,index,list,i){
      this.removePop = true
      this.removeData = {shop,index,list,i}    
    },
    removeConfirm(){
    let {shop,index,list,i} = this.removeData
    axios.post('http://rap2api.taobao.org/app/mock/7058/cart/remove',{id:list.id})
    .then(rep=>{
      shop.goodsList.splice(i,1)
      if(!shop.goodsList.length){
        this.lists.splice(index,1)
      }
      this.removePop = false
      this.editingShop = null
      this.lists.forEach(item=>{
          item.editing = false
          item.msg = '编辑'
        
      })
    })
    },
    confirm(){
      this.removePop = false
    },
    start(e,list){
      list.startX = e.changedTouches[0].clientX
    },
    end(e,list){
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if(list.startX - endX > 80){
        left = '-64px'
      }
      if(endX - list.startX > 80){
        left = '0px'
      }
      setTimeout(()=>{
        left = '0px'
        Velocity(this.$refs[list.id],{
          left:left
        })
      },2600)
      Velocity(this.$refs[list.id],{
        left:left
      })
    }
  },
  created() {
    this.getLists()
  },
  mixins: [mixin]
})