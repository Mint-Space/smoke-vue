<template>
  <div class="box">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/homes' }">
          烟感浏览
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/smokes/building"> 建筑布局 </a>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/smokes/floor' }">
          烟感楼层
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="menu">
        <el-button
          icon="el-icon-menu"
          size="35px"
          v-show="isChange"
          @click="changeTable()"
        >
          图表切换
        </el-button>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "CSmoke",
  data() {
    return {
      isChange: false,
    };
  },
  methods: {
    isShowButton() {
      if (this.$route.path == "/smokes/building") {
        this.isChange = false;
      } else if (
        this.$route.path == "/smokes/floor" ||
        this.$route.path == "/smokes/list"
      ) {
        this.isChange = true;
      }
    },
    changeTable() {
      if (this.$route.path == "/smokes/floor") {
        this.$router.push({
          name: "list",
        });
      } else if (this.$route.path == "/smokes/list") {
        this.$router.push({
          name: "floor",
        });
      }
    },
    removeBuildDataToStorage() {
      window.localStorage.removeItem("build");
      window.localStorage.removeItem("floor");
      window.localStorage.removeItem("rooms");
      window.localStorage.removeItem("times");
      window.localStorage.removeItem("smokeStatus");
    },
    
  },
  
  
  created() {
    this.isShowButton();
  },
  updated() {
    this.isShowButton();
  },
  destroyed() {
    this.removeBuildDataToStorage();
    clearInterval(this.timer);
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  width: 100%;
  .nav {
    height: 10%;
    position: relative;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .menu {
      margin-right: 10px;
    }
  }
  .container {
    width: 100%;
    height: 90%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }
}
</style>