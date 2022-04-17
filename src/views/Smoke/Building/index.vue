<template>
  <div class="container">
    <c-buildings class="buildings"></c-buildings>
    <c-legend class="legend"></c-legend>
  </div>
</template>

<script>
import CBuildings from "../Floor/BuildingList/Buildings";
import CLegend from "../Floor/Legend";
export default {
  name: "CBuilding",
  components: {
    CBuildings,
    CLegend,
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  .buildings {
    width: 90%;
    height: 100%;
  }
  .legend {
    width: 10%;
    height: 100%;
  }
}
</style>