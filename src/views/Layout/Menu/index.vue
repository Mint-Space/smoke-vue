<template>
  <el-menu
    default-active="1-4-1"
    collapse-transition
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
  >
    <el-menu-item index="/homes" @click="showMenu">
      <i class="el-icon-location"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-submenu index="/smokes">
      <template slot="title">
        <div @click="showMenu">
          <i class="el-icon-menu"></i>
          <span slot="title">烟感监测</span>
        </div>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/smokes/building" @click="showSmoke"
          >建筑布局</el-menu-item
        >
        <el-menu-item index="/smokes/list">烟感列表</el-menu-item>
        <el-menu-item index="/smokes/about">测试</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showMenu() {},
    showHome() {},
    showSmoke() {
      // window.localStorage.clear()
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  padding-right: 20px;
  padding-left: 20px;
  height: 100%;
  width: 150px;
}
</style>