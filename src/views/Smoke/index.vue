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
          v-show="isShowExcel"
          @click="exportExcel()"
        >
          导出Excel表格
        </el-button>
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
import excelUtil from "@/utils/excel";
import { mapState } from "vuex";
export default {
  name: "CSmoke",
  data() {
    return {
      isChange: false,
      isShowExcel: false,
      tableList: [],
    };
  },
  methods: {
    //导出事件
    exportExcel() {
      const excelFileName =
        this.tableList[0].build + "_" + this.tableList[0].floor + ".xlsx";
      const tableHead = [
        {
          title: "建筑名称",
          dataIndex: "build",
          key: "build",
          className: "text-monospace",
        },
        {
          title: "烟感手报楼层",
          dataIndex: "floor",
          key: "floor",
        },
        {
          title: "烟感手报位置",
          dataIndex: "room",
          key: "room",
        },
        {
          title: "设备联网时间",
          dataIndex: "time",
          key: "time",
        },
        {
          title: "设备类型",
          dataIndex: "deviceTypeTitle",
          key: "deviceTypeTitle",
        },
        {
          title: "设备状态",
          dataIndex: "smokeStatusTitle",
          key: "smokeStatusTitle",
        },
      ];
      excelUtil.exportExcel(tableHead, this.tableList, excelFileName);
    },

    isShowButton() {
      if (this.$route.path == "/smokes/building") {
        this.isChange = false;
      } else if (
        this.$route.path == "/smokes/floor" ||
        this.$route.path == "/smokes/table"
      ) {
        this.isChange = true;
        // if (this.$route.path == "/smokes/table") {
        //   this.isShowExcel = true;
        // }
      }
    },
    changeTable() {
      if (this.$route.path == "/smokes/floor") {
        this.isShowExcel = true;
        this.$router.push({
          name: "table",
        });
      } else if (this.$route.path == "/smokes/table") {
        this.isShowExcel = false;
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
  computed: {
    ...mapState("buildingStore", ["buildTableList"]),
  },
  watch: {
    buildTableList(newBuild) {
      this.tableList = newBuild;
    },
  },
  created() {
    console.log(this);
    this.isShowButton();
    this.tableList = this.buildTableList;
  },
  updated() {
    this.isShowButton();
  },
  destroyed() {
    // this.removeBuildDataToStorage();
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