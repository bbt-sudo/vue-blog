<template>
  <div class="me">
    <div class="me-header">
      <div class="me-header-top">
        <div class="me-header-top-l">
          <div>{{ useMeStore.userInfo.user_name }}</div>
        </div>
        <div class="me-header-top-r">
          <img :src="useMeStore.userInfo.picture" alt="" />
        </div>
      </div>
      <div class="me-header-bottom">
        <div>
          <p>129</p>
          <p class="p2">关注</p>
        </div>
        <div>
          <p>{{ useMeStore.userInfo.fans }}</p>
          <p class="p2">粉丝</p>
        </div>
        <div>
          <p>179</p>
          <p class="p2">收藏</p>
        </div>
        <div>
          <p>45</p>
          <p class="p2">点赞</p>
        </div>
      </div>
    </div>
    <div class="me-main">
      <div class="me-main-top">
        <p>创作与收藏</p>
        <div class="me-main-top-centent">
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            收藏夹
          </div>
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-fenxiangfabu"></use>
            </svg>
            已发布
          </div>
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-caogaoxiang"></use>
            </svg>
            草稿箱
          </div>
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-zuopin"></use>
            </svg>
            作品夹
          </div>
        </div>
      </div>
      <div class="me-main-bottom">
        <p>管理与服务</p>
        <div class="me-main-botom-centent">
          <div @click="setting">
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-shezhi"></use>
            </svg>
            设置
          </div>
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-dizhi"></use>
            </svg>
            地址
          </div>
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-huiyuanqia"></use>
            </svg>
            会员
          </div>
          <div>
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-kefu"></use>
            </svg>
            客服
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
import { UseMeStore } from "../../store";
const useMeStore = UseMeStore()
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

function setting() {
  setTimeout(() => {
    router.push('/setting')
  }, 200)
}
/**
 * 数据部分
 */
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
 axios.get(`http://localhost:3000/api/user/${localStorage.getItem('id')}`).then((res) => {
      useMeStore.userInfo = res.data.data
  })
});
onMounted(() => {
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
.me {
  height: 90vh;
}
.me-header {
  height: 30vh;
  background-image: linear-gradient(
    to top,
    #f3e7e9 0%,
    #e3eeff 99%,
    #e3eeff 100%
  );
  .me-header-top {
    position: absolute;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    top: 5vh;
    .me-header-top-l {
    }
    .me-header-top-r {
      background-color: #ffff;
      border-radius: 20vw;
      width: 20vw;
      height: 11vh;
      img {
        width: 20vw;
        height: 11vh;
        border-radius: 20vw;
      }
    }
  }
  .me-header-bottom {
    display: flex;
    position: absolute;
    width: 100vw;
    top: 20vh;
    justify-content: space-evenly;
    align-items: center;
    font-size: 5vw;
    div {
      height: 10vh;
      p {
        margin: 0;
      }
      .p2 {
        font-size: 2vw;
        color: #989090;
      }
    }
  }
}
.me-main {
  width: 94vw;
  margin-left: 3vw;
  margin-top: 8vh;
  .me-main-top {
    p {
      margin: 0;
      font-size: 4vw;
      padding-bottom: 2vw;
    }
    /deep/.me-main-top-centent {
      width: 94vw;
      height: 10vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 1opx;
      background-color: #ffffff;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 4vw;
      }
    }
  }
  .me-main-bottom {
    p {
      padding-top: 2vw;
      margin: 0;
      font-size: 4vw;
      padding-bottom: 2vw;
    }
    .me-main-botom-centent {
      display: flex;
      height: 10vh;
      align-items: center;
      justify-content: space-around;
      border-radius: 10px;
      background-color: #ffffff;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 4vw;
      }
    }
  }
}
</style>