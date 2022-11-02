import axios from 'axios'
import { defineStore } from 'pinia'

const UseLoginStore = defineStore('loginStore', {
  state: () => ({
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    userInfo: {},
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.$state.token = token
      localStorage.setItem('token', token)
    },
    removeToken() {
      // 删除token
      localStorage.removeItem('token')
    },
  },
})

export default UseLoginStore
