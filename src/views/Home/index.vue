<template>
  <div class="home">
    <div class="home-hseader">
      <button class="sosuo">
        <div class="icon-fb">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </div>
        搜索
      </button>
    </div>
    <div class="home-content">
      
        <div class="content" v-for="item in useHomeStore.list" :key="item.id" @click="dj(item)">
          <div class="l">
            <img src="../../../public/img/forget-password.jpg" alt="" />
          </div>
          <div class="r">
            <div class="r-header">
              <p>{{ item.title }}</p>
              <span></span>
            </div>
            <div class="r-mian">
              <div class="r-content">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import axios from "axios";
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { UseMainStore } from "../../store";
import { UseHomeStore } from "../../store";
const useHomeStore = UseHomeStore();
const useMainStore = UseMainStore()
const route = useRoute()
const router = useRouter()

function onLoad() {}

function dj(item: any) {
axios.post('http://localhost:3000/api/article/reading',{
     id: item.id,
     userid: item.userId
  })
axios.post('http://localhost:3000/api/global/findeFans', {
    userId: useMainStore.LoginUserId,
    Attention: useMainStore.attention,
  }).then(res => {
    // console.log(res.data.data);
   if(res.data.data.code === 0) {
      useMainStore.gzShow = true
   }else{
      useMainStore.gzShow = false
   }
  })
  setTimeout(() => {
    router.push('/article/'+ item.id)
  },1000)
}
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
  axios.post('http://localhost:3000/api/article/list/').then((res) => {
        console.log(res.data.data)
        // useLoginStore.getUserInfo(res.data.data.userId)
        useHomeStore.list = res.data.data
      })
});
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>
<style scoped lang='less'>
.home {
  width: 100vw;
  height: 93vh;
  overflow: auto;
}
.home-hseader {
  position: relative;
  height: 12vh;
  background-color: #ffffff;
  .sosuo {
    position: absolute;
    left: 2.5vw;
    top: 2vw;
    width: 95vw;
    height: 10vh;
    border: #99f19e;
    border-radius: 5vw;
    background-color: #99f19e;
    font-size: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.home-content {
  margin-top: 0.5vh;
  .content {
    width: 98vw;
    height: 20vh;
    margin-left: 1vw;
    margin-bottom: 1vw;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    border-radius: 4px;
    .l {
      background-color: #caf6e1;
      width: 35vw;
      height: 35vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;

      img {
        width: 34vw;
        height: 34vw;
        border-radius: 4px;
      }
    }
    .r {
      width: 60vw;
      border-radius: 4px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }
}
.r-header {
  font-size: 0.5vw;
  color: #5f5d5d;
  p {
    overflow: hidden;
    white-space: nowrap;
    width: 30vw;
    height: 5vw;
    text-overflow: ellipsis;
  }
}
.r-mian {
  font-size: 2vw;
  width: 60vw;
  .r-content {
    margin-left: 0;
    width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
    p {
      margin: 0;
      width: 60vw;
      height: 12vh;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 1vw;
      text-align: center;
    }
  }
}
</style>