<template>
  <el-container class="container">
    <el-header height="80px"><Title></Title></el-header>
    <el-container class="mains">
      <el-aside width="auto">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./Menu";
import Title from "./Title";
export default {
  name: "LayoutView",
  components: {
    Menu,
    Title,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  .el-header {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    animation: gradientBG 5s ease infinite;
    background-size: 600% 600%;
    color: #fff;
  }
}
.mains {
  height: 100%-80px;
  width: 100%;
  .el-aside {
    width: auto;
    overflow: hidden;
  }
  .el-main {
    // width: auto;
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