import { defineStore } from 'pinia'
import axios from 'axios'

const UseMeStore = defineStore('homeStore', {
  state: () => ({
    userInfo: {},
  }),
  getters: {},
  actions: {},
})

export default UseMeStore
