<template>
  <div class="publish">
    <div class="pb-header">
      <van-nav-bar title="发布帖子" left-text="返回" left-arrow />
    </div>
    <div class="pb-main">
      <div>
        <div class="icon-bt">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-custom-business"></use>
          </svg>
        </div>
        <div class="icon-tz">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tiezi"></use>
          </svg>
        </div>
        <div class="icon-fb">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-huati2"></use>
          </svg>
        </div>
      </div>
      <van-cell-group inset>
        <van-field
          v-model="form.title"
          label="标题"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="form.content"
          rows="2"
          autosize
          label="帖子"
          type="textarea"
          maxlength="100"
          placeholder="请输入帖子"
          show-word-limit
        />
      </van-cell-group>
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="栏目"
        placeholder="请选择发布的栏目"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="form.categoryId"
          title="请选择发布的栏目"
          :options="usePublishStore.categoryList"
          @close="show = false"
          @finish="onFinish"
          :field-names="fieldNames"
        />
      </van-popup>
    </div>
    <div class="pb-footer">
      <button class="fbbt" @click="publish">
        <svg class="icon icon-ft" aria-hidden="true">
          <use xlink:href="#icon-fenxiangfabu"></use></svg
        >确定发布
      </button>
      <van-notify v-model:notshow="notshow" type="success">
        <span>通知内容</span>
      </van-notify>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { UsePublishStore, UseLoginStore } from "../../store";
import { Notify } from "vant";

const usePublishStore = UsePublishStore();
const useLoginStore = UseLoginStore()
const getCategory = usePublishStore.getCategory;
const form = reactive({
  title: "",
  content: "",
  categoryId: +"",
  userId: localStorage.getItem('id')
});
const fieldValue = ref("");
const fieldNames = {
  text: "title",
  value: "id",
};
const show = ref(false);
const notshow = ref(false);
const token = useLoginStore.token
/**
 * 仓库
 */
function onConfirm(value: string) {
  show.value = true;
}
function onChange() {}
function onFinish(value: any) {
  show.value = false;
  fieldValue.value = value.selectedOptions[0].title;
}
function publish() {
  axios
    .post("http://localhost:3000/api/article/reg", {
      ...form,
    },{
      headers: {
       ' Authorization' : `Bearer${token}`
      }
    })
    .then((res) => {
      console.log(res.status);
      if (res.status === 201) {
        router.push("/").then(() => {
          Notify({
            message: "发布成功",
            type: "primary",
            duration: 2000,
            background: "#99f19e",
          });
        });
      }
    });
}
function showNotify() {}
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
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
  getCategory();
  // console.log(usePublishStore.categoryList);
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({});
</script>
<style scoped lang='less'>
/deep/.van-cell-group {
  margin: 0;
  border-radius: 0;
  border-bottom: 1px #e5e5e590 solid;
  position: relative;
}
/deep/.van-cell__title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-bt {
  z-index: 100;
  position: absolute;
  top: 7.3vh;
  left: 2.8vw;
}
.icon-tz {
  z-index: 100;
  position: absolute;
  top: 17vh;
  left: 2.8vw;
}
.icon-fb {
  z-index: 100;
  position: absolute;
  top: 27vh;
  left: 2.8vw;
}
.pb-footer {
  position: absolute;
  top: 50vh;
  .fbbt {
    display: flex;
    width: 95vw;
    height: 8vh;
    margin-left: 2.5vw;
    border-radius: 5vw;
    background-color: #fae067;
    font-size: 5vw;
    text-align: center;
    justify-content: center;
    align-items: center;
    .icon-ft {
      width: 8vw;
      height: 8vh;
    }
  }
}
</style>