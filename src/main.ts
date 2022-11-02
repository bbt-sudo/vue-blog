import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import '//at.alicdn.com/t/c/font_3731387_cj367nnymg.js'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Vant)
app.mount('#app')
