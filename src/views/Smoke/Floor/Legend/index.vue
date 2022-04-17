<template>
  <div class="legend">
    <div class="box alarm">火警</div>
    <div class="box off-line">离线</div>
    <div class="box under-voltage">亏电</div>
    <div class="box normal">正常</div>
  </div>
</template>

<script>
export default {
  name: "CLegend",
};
</script>

<style lang="less" scoped>
.legend {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .box {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    margin: 20px 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 3px 3px 10px rgb(180, 173, 173);
    }
  }
  .alarm {
    background-color: rgb(209, 56, 56);
  }
  .off-line {
    background-color: rgb(138, 138, 138);
  }
  .under-voltage {
    background-color: rgb(221, 198, 65);
  }
  .normal {
    background-color: rgb(55, 172, 107);
  }
}
</style>