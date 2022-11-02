<template>
  <div class="register">
    <div class="reg-header">
      <p>天地玄黄社区</p>
    </div>
    <div class="reg-main">
      <div class="reg-main-hea">
        <p>请注册</p>
        <p>请输入您的信息进行注册</p>
      </div>
      <div class="reg-main-main">
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
        <div class="confirmpassword">
          <div class="confirm-icon">
            <svg class="icon icon-ft" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </div>
          <div class="confirm-input">
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="请输入确认密码"
              v-model="form.password_confirm"
            />
          </div>
        </div>
        <div class="reg-btn">
          <button @click="register">注册</button>
        </div>
      </div>
      <div class="reg-main-foot"></div>
    </div>
    <div class="reg-footer"></div>
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

const checked = ref(false);

const form = reactive({
  email: "",
  password: "",
  password_confirm: "",
});
/**
 * 仓库
 */
function register() {
  axios
    .post("http://localhost:3000/api/user/register", {
      ...form,
    })
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        router.push("/login").then(() => {
          Notify({
            message: "注册成功",
            type: "primary",
            duration: 2000,
            background: "#99f19e",
          });
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
.register {
  height: 100vh;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reg-header {
  width: 100vw;
  height: 25vh;
  text-align: center;
  line-height: 25vh;
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
.reg-main {
  width: 90vw;
  .reg-main-hea p {
    font-size: 3.5vw;
    padding: 1vw 0;
  }
  .reg-main-hea p:nth-child(1) {
    font-weight: bold;
    font-size: 4vw;
  }
  .reg-main-hea p:nth-child(2) {
    font-size: 3vw;
    color: #787474e7;
    font-weight: 200;
  }
}
.reg-main-main {
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
  .confirmpassword {
    margin: 1vw 0;

    display: flex;
    width: 90vw;
    height: 10vh;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    align-items: center;
    .confirm-icon {
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
  .reg-btn {
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