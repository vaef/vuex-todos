import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    btnStatusValue: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    changeInputValue (state, newValue) {
      state.inputValue = newValue
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem (state, id) {
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      state.list[i].done = param.status
    },
    clean (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeList (state, key) {
      state.btnStatusValue = key
    }
  },
  actions: {
    getlist (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength (state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList (state) {
      if (state.btnStatusValue === 'all') {
        return state.list
      } else if (state.btnStatusValue === 'undone') {
        return state.list.filter(x => !x.done)
      } else if (state.btnStatusValue === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})
