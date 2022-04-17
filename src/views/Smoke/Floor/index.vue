<template>
  <el-row>
    <el-col :span="5">
      <c-building-list class="list"></c-building-list>
    </el-col>
    <el-col :span="14">
      <c-rooms class="map"></c-rooms>
    </el-col>
    <el-col :span="5">
      <c-legend></c-legend>
    </el-col>
  </el-row>
</template>

<script>
import CLegend from "./Legend";
import CRooms from "./Rooms";
import CBuildingList from "./BuildingList";
export default {
  name: "CFloor",
  components: {
    CRooms,
    CBuildingList,
    CLegend,
  },
};
</script>

<style lang="less" scoped>
.el-row {
  width: 100%;
  height: 100%;
}
.el-col {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  .list {
    height: 90%;
    overflow-y: scroll;
  }
  .map{
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>