<template>
  <div >
    <div class="setting-header">
      <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="setting-main">
      <button @click="Logout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Notify } from 'vant';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UseLoginStore } from '../../../store'
const useLoginStore = UseLoginStore()
/**
* 仓库
*/
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
function onClickLeft() {
  router.go(-1)
}
function Logout() {
  useLoginStore.removeToken()
  if(localStorage.getItem('token') === null) {
    router.push('/')
    Notify({
            message: "退出成功",
            type: "primary",
            duration: 2000,
            background: "#99f19e",
          });
  }

  
}
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.setting-main{
  button{
    width: 90vw;
    height: 10vh;
    margin-left: 5vw;
    border-radius: 10px;
    background-image: linear-gradient(-225deg, #DFFFCD 0%, #90F9C4 48%, #39F3BB 100%);
    border: none;
  }
}
</style>