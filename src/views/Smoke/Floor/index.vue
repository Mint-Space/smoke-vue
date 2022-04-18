<template>
  <el-row>
    <el-col :span="5">
      <div class="scrollbar-building">
        <el-scrollbar style="height: 100%">
          <c-building-list></c-building-list>
        </el-scrollbar>
      </div>
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

<style lang="less" >
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
  .map {
    margin-left: 20px;
    margin-right: 20px;
  }
  .scrollbar-building {
    width: auto;
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
    }
  }
}
</style>