<template>
  <div class="table">
    <div class="scrollbar-building">
      <el-scrollbar style="height: 100%">
        <c-building></c-building>
      </el-scrollbar>
    </div>
    <c-building-list class="list"></c-building-list>
  </div>
</template>

<script>
import CBuilding from "../Floor/BuildingList/Buildings";
import CBuildingList from "./List";
export default {
  name: "CTable",
  components: {
    CBuilding,
    CBuildingList,
  },
};
</script>

<style lang="less" >
.table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  .scrollbar-building {
    width: 20%;
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
    }
  }
  .list {
    width: 80%;
  }
}
</style>