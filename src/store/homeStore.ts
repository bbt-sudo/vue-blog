import { defineStore } from 'pinia'
import axios from 'axios'

const UseHomeStore = defineStore('homeStore', {
  state: () => ({
    list: [],
  }),
  getters: {},
  actions: {},
})

export default UseHomeStore
