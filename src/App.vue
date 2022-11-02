<template>
  <div class="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <Nav v-show="NavShow"></Nav>
  </div>
</template>
<script setup lang="ts">
import Nav from '@/components/Nav/index.vue'
import axios from 'axios';
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router';

const NavShow = ref(true)
const route = useRoute()
const router = useRouter()
router.beforeEach((to,from) => {

  if(to.name === 'login' || to.name === 'register' || to.name === 'article'){
    NavShow.value = false
    
  }else{
    NavShow.value = true
  }
})
</script>
<style lang="less">
.icon {
  width: 7vw;
  height: 5vh;
  vertical-align: -0.15em;
  fill: currentColor; //填充当前的颜色
  overflow: hidden;
}
* {
  padding: 0;
  margin: 0;
  list-style: none;
}
.app {
  width: 100vw;
  background-color: #fafafa;
}
.main{
  height: 96vh;
}
</style>
