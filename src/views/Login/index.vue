<template>
  <div class="login">
    <div class="login-header">
      <p>天地玄黄社区</p>
    </div>
    <div class="login-main">
      <div class="login-main-hea">
        <p>登录</p>
        <p>请输入您的账号密码进行登录</p>
      </div>
      <div class="login-main-main">
        <div class="email">
          <div class="email-icon">
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-youxiang"></use>
            </svg>
          </div>
          <div class="email-input">
            <p>Email</p>
            <input type="email" placeholder="请输入邮箱" v-model="form.email" />
          </div>
        </div>
        <div class="password">
          <div class="password-icon">
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </div>
          <div class="password-input">
            <p>Password</p>
            <input
              type="password"
              placeholder="请输入密码"
              v-model="form.password"
            />
          </div>
        </div>
        <div class="login-btn">
          <button @click="login">登录</button>
        </div>
      </div>
      <div class="login-main-foot"></div>
    </div>
    <div class="login-footer"></div>
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
import { Notify } from "vant";
import { log } from "console";
import { UseLoginStore } from '../../store'
import { UseMainStore } from '../../store'
const useLoginStore = UseLoginStore()
const useMainStore = UseMainStore()

const form = reactive({
  email: "",
  password: "",
});
/**
 * 仓库
 */
function login() {
  axios
    .post("http://localhost:3000/api/user/login/", {
      ...form
    })
    .then((res) => {
      useLoginStore.setToken(res.data.data.token)
      localStorage.setItem('id', res.data.data.id)
      if (res.status === 201) {
        console.log(res);
        router.push("/me").then(() => {
          Notify({
            message: "登录成功",
            type: "primary",
            duration: 2000,
            background: "#99f19e",
          });
        });
      }else{
         Notify({
            message: "登录成功",
            duration: 2000,
            background: "red",
          });
      }
    });
}
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
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
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
.login {
  height: 100vh;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-header {
  width: 100vw;
  height: 30vh;
  text-align: center;
  line-height: 23vh;
  font-size: 5vw;
  font-weight: bold;
  background-image: linear-gradient(
    to top,
    #f3e7e9 0%,
    #e3eeff 99%,
    #e3eeff 100%
  );
  -webkit-background-clip: text;
  color: transparent;
}
.login-main {
  width: 90vw;
  .reg-main-hea p {
    font-size: 3.5vw;
    padding: 1vw 0;
  }
  .login-main-hea p:nth-child(1) {
    font-weight: bold;
    font-size: 4vw;
  }
  .login-main-hea p:nth-child(2) {
    font-size: 3vw;
    color: #787474e7;
    font-weight: 200;
  }
}
.login-main-main {
  display: flex;
  align-items: center;
  flex-direction: column;

  .email {
    display: flex;
    width: 90vw;
    height: 10vh;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    align-items: center;
    margin: 1vw 0;
    .email-icon {
      width: 35vw;
      display: flex;
      justify-content: space-evenly;
    }
    p {
      font-size: 3.5vw;
      color: #c5c2c2;
    }
    input {
      width: 65vw;
      border: none;
      font-size: 4vw;
      color: #a69a9a;
    }
  }
  .password {
    margin: 1vw 0;
    display: flex;
    width: 90vw;
    height: 10vh;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    align-items: center;
    .password-icon {
      width: 35vw;
      display: flex;
      justify-content: space-evenly;
    }
    p {
      font-size: 3.5vw;
      color: #c5c2c2;
    }
    input {
      width: 65vw;
      border: none;
      font-size: 4vw;
      color: #a69a9a;
    }
  }
  .login-btn {
    button {
      width: 90vw;
      border-radius: 15px;
      height: 8vh;
      margin-top: 3vh;
      background-color: #b6e2f7;
      border: none;
    }
  }
}
</style>