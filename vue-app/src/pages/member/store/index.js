// 使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'

// 创建Store实例
const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    add(state, instance) {
      state.lists.push(instance)
    },
    remove(state, id) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id == id
      })
      lists.splice(index, 1)
    },
    update(state, instance) {
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id == instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
  },
  actions: {
    getLists({commit}) {
      axios.get('http://rap2api.taobao.org/app/mock/7058/address/list')
      .then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction({commit}, instance) {
      axios.post('http://rap2api.taobao.org/app/mock/7058/address/add',{instance})
      .then(res => {
        commit('add', instance)
      })
    },
    removeAction({commit}, id) {
      axios.post('http://rap2api.taobao.org/app/mock/7058/address/remove',{id})
      .then(res => {
        commit('remove', id)
      })
    },
    updateAction({commit}, instance) {
      axios.post('http://rap2api.taobao.org/app/mock/7058/address/updata',{instance})
      .then(res => {
        commit('update', instance)
      })
    },
   
  }
})

export default store