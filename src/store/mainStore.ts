import axios from 'axios'
import { defineStore } from 'pinia'

const UseMainStore = defineStore('mainStore', {
  state: () => ({
    name: 'mainStore',
    article: {},
    userInfo: {},
    gzShow: false,
    LoginUserId: localStorage.getItem('id') ? localStorage.getItem('id') : null,
    attention: null,
  }),
  getters: {},
  actions: {
    getArticle(id: any) {
      axios.get(`http://localhost:3000/api/article/${id}`).then((res) => {
        // console.log(res.data.data.userId)
        this.attention = res.data.data.userId
        axios.get(`http://localhost:3000/api/user/${res.data.data.userId}`).then((res) => {
          console.log(res.data.data)
          this.userInfo = res.data.data
        })
        this.$state.article = res.data.data
      })
    },
    // setUserId(id: string) {
    //   this.$state.LoginUserId = id

    // },
  },
})

export default UseMainStore
