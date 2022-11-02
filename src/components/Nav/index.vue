<template>
  <div>
     <div class="footer">
      <van-tabbar
        v-model="active"
        active-color="#D1B6E1"
        inactive-color="#58C9B9"
      >
        <van-tabbar-item to="/"
          >首页
          <div class="home-page">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shouye"></use>
            </svg>
          </div>
        </van-tabbar-item>
        <van-tabbar-item to="/publish"
          >发布
          <div class="home-page">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fabu"></use>
            </svg>
          </div>
        </van-tabbar-item>
        <van-tabbar-item to="/me"
          >我的
          <div class="home-page">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wode1"></use>
            </svg>
          </div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/**
* 仓库
*/
/**
* 路由对象
*/
const title = ref("app");
const active = ref(0);
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
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
.footer /deep/ van-tabbar {
  width: 100vw;
  height: 10vh;
  background-color: aliceblue;
  position: absolute;
  bottom: 0;
}
/deep/.van-tabbar-item__text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
}
</style>