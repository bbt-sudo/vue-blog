<template>
  <div  class="articlepage">
    <div class="art">
      <div class="art-header">
      <van-nav-bar title="标题" left-text="返回" @click-left="onClickLeft" left-arrow>
        <template #right>
          <button class="fx" @click="showShare = true">...</button>
        </template>
        <van-share-sheet
          v-model:show="showShare"
          title="立即分享给好友"
          :options="options"
          @select="onSelect"
        />
      </van-nav-bar>
     <div class="hea-user"> 
      <img class="user-img" :src="useMainStore.userInfo.picture" alt="">
      <div class="user-info">
        <p>{{ useMainStore.userInfo.user_name }}</p>
        <p>发布一天前</p>
        <p>阅读量{{ useMainStore.article.reading }}</p>
      </div>
      <button class="gz" @click="gz">{{  useMainStore.gzShow===true? '已关注':'关注'   }}</button>
     </div>
    </div>
    <div class="art-main">
      <div class="hea-title">
       <p>{{ useMainStore.article.title }}</p>
     </div>
      <div class="art-main-content">
        <p>{{ useMainStore.article.content }}</p>
      </div>
      <div class="art-comments">
        <div class="pl" v-for="item in review">
          <div class="pl-user">
            <img src="https://blog-1253644396.cos.ap-hongkong.myqcloud.com/imag%2F37ed9f8cb40ba68e098e4de188a32a62.png
" alt="">
            <div class="user">
              <p>name</p>
            </div>
          </div>
          <div pl-nr>
            <p class="text">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="art-footer">
      <div class="footer-btn">
        <div @click="mtk = !mtk">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglunqu"></use>
            </svg>
            评论
          </div>
          <div @click="icon.shoucang = !icon.shoucang">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="icon.shoucang? '#icon-shoucang-act': '#icon-shoucang'"></use>
            </svg>
            收藏
          </div>
          <div @click="icon.dianzan = !icon.dianzan">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="icon.dianzan? '#icon-dianzan-act':'#icon-dianzan'"></use>
            </svg>
            点赞
          </div>
         <van-popup
          v-model:show="mtk"
          round
          position="bottom"
          :style="{ height: '40%' }"
          >
            <van-cell-group inset>
              <van-field
                v-model="text"
                rows="2"
                autosize
                type="textarea"
                maxlength="120"
                placeholder="请输入留言"
                show-word-limit
                autofocus
              />
            </van-cell-group>
            <button class="fb" @click="fb">发布评论</button>
          </van-popup>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import axios from 'axios';
import { Notify, Toast, ToastOptions } from 'vant';
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { UseMainStore } from '../../store'
const useMainStore = UseMainStore()
const showShare = ref(false)
const options = [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ];

    const onSelect = (option: { name: string | ToastOptions | undefined; }) => {
      Toast(option.name);
      showShare.value = false;
    };
    const icon = reactive({
      shoucang: false,
      dianzan: false
    })
    const value = ref('')
    const mtk = ref(false)
    const text = ref('')
    const review = reactive([])
    let userInfo = reactive({})
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
const id = route.params.id
function onClickLeft() {
  router.go(-1)
}

function gz() {
  console.log(useMainStore.attention, useMainStore.LoginUserId);
  if(useMainStore.gzShow === true ){
      axios.post('http://localhost:3000/api/global/delete',{
              Attention: id,
              userId: useMainStore.LoginUserId,
            }).then(res => {
              if(res.status === 201) {
                useMainStore.gzShow = false
              }
          })
  }
  if(useMainStore.gzShow === false ){
     axios.post('http://localhost:3000/api/global/attention/',{
        Attention: useMainStore.attention,
        userId: useMainStore.LoginUserId,
      }).then(res => {
        if(res.status === 201) {
          useMainStore.gzShow = true
        }
    })
  }
}
function fb() {
  console.log(useMainStore.LoginUserId,id);
  axios.post('http://localhost:3000/api/review/review/',{
    text: text.value,
    userId:useMainStore.LoginUserId,
    articleId:id,
  }).then(res => {
    if(res.status === 201){
      // axios.get(`http://localhost:3000/api/user/1/api/user/${res.data.data.userId}`).then(user => {
      //   userInfo = res.data.data
      // })
       Notify({
            message: "发布成功",
            type: "primary",
            duration: 2000,
            background: "#99f19e",
          });
    }
  })
}
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
  useMainStore.getArticle(id)
  axios.get(`http://localhost:3000/api/review/${id}`).then(res => {
    console.log(res);
    res.data.data.map((item: any) => review.push(item))
  })
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
.articlepage{
  width: 100vw;
}

.art-header{
  position: relative;
  .fx{
    width: 7vw;
    height: 5vw;
    font-size: 7vw;
    text-align: center;
    line-height: 5vw;
    background-color: #ffffff;
    border: none;
    margin-bottom: 2vw;
  }
  .hea-user{
    display: flex;
    align-items: center;
    img{
        width: 15vw;
        height: 15vw;
        border: 1px solid rgb(217, 210, 210);
        border-radius: 10px;
    }
    .user-info{
      font-size: 4vw;
      p:nth-child(1){
        font-weight: bold;
      }
      p:nth-child(2),p:nth-child(3){
        font-weight: 200;
        color: rgb(145, 137, 137);
      }
    }

    button{
      position: absolute;
      right: 2.5vw;
      width: 10vw;
      height: 3.5vh;
      font-size: 2vw;
      color: #6AAFE6;
      background-color: #c4dff3;
      border: none;
    }

  }
  
}

.art-main{
  width: 95vw;
  margin-left: 2.5vw;
   overflow: scroll;
   height: 74vh;
}
.art-main-content{
  p{
    width: 95vw;
    font-size: 5vw;
    font-weight: bold;
  }
}
.art-comments{
  background-color: antiquewhite;
  width: 94vw;
  height: 15vh;
  border-radius: 10px;
  border: 1px solid #ffc952;
}
.art-footer{
  height: 10vh;
  .footer-btn{
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 4vw;
    }
    .icon{
      width: 10vw;
    }
  }
}

/deep/.van-cell__value {
  background-color: #efefef;
  width: 80vw;
  height: 40vh;
}
.fb{
  width: 80vw;
  height: 8vh;
  margin-left: 10vw;
  border-radius: 2vw;
  border-color: #ffc952;
}
.pl{
  width: 94vw;
  background-color: #6AAFE6;
  .pl-user{
    display: flex;
    justify-content: flex-start;
    img{
      width: 10vw;
    }
    p{
      font-size: 5vw;
    }
  }
}
/deep/.text{
   font-size: 5vw;
   width: 80vw;
   margin-left: 10vw;
}

</style>