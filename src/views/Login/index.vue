<template>
  <div class="homes">
    <login-view class="container"></login-view>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginView from "./LoginView";

export default {
  name: "HomeView",
  components: {
    LoginView,
  },
};
</script>

<style lang="less" scoped>
.homes {
  width: 100vw;
  height: 100vh;
  /* 循环动画 - 原理4 */
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  animation: gradientBG 5s ease infinite;
  background-size: 600% 600%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  .container {
    background-image: url("@/assets/city-night.jpg");
    background-repeat: no-repeat;
    background-origin: padding-box;
    background-size: cover;
    background-position: center;
    width: 100%-1px;
    height: 100%-2px;
    border-radius: 20px;
    box-shadow: 5px 5px 25px #303030;
    z-index: 1;
  }
}
/* 动画，控制背景 background-position */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
