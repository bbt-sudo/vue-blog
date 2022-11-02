import axios from 'axios'
import { defineStore } from 'pinia'

const UsePublishStore = defineStore('publishStore', {
  state: () => ({
    categoryList: [],
  }),
  getters: {},
  actions: {
    getCategory() {
      axios.get('http://localhost:3000/api/category').then((res) => {
        console.log(res.data.data)
        this.categoryList = res.data.data
      })
    },
  },
})

export default UsePublishStore
