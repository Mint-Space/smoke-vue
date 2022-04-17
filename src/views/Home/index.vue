<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="echarts" ref="echarts"></div>
      </el-col>
      <el-col :span="12">
        <div class="echarts" ref="echarts1"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="echarts" ref="echarts2"></div>
      </el-col>
      <el-col :span="12">
        <div class="echarts" ref="echarts3"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CHome",
  data() {
    return {
      myChart: {},
      myChart1: {},
      myChart2: {},
      myChart3: {},
      echartsOptions: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  methods: {
    showEcharts() {
      this.myChart = this.$echarts.init(this.$refs.echarts);
      this.myChart.setOption(this.echartsOptions);
    },
    showEcharts1() {
      this.myChart1 = this.$echarts.init(this.$refs.echarts1);
      this.myChart1.setOption(this.echartsOptions);
    },
    showEcharts2() {
      this.myChart2 = this.$echarts.init(this.$refs.echarts2);
      this.myChart2.setOption(this.echartsOptions);
    },
    showEcharts3() {
      this.myChart3 = this.$echarts.init(this.$refs.echarts3);
      this.myChart3.setOption(this.echartsOptions);
    },
  },
  mounted() {
    let _this = this;
    window.onresize = function () {
      _this.myChart.resize();
      _this.myChart1.resize();
      _this.myChart2.resize();
      _this.myChart3.resize();
    };

    this.showEcharts();
    this.showEcharts1();
    this.showEcharts2();
    this.showEcharts3();
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  .el-row {
    width: 100%;
    height: 50%;
    .el-col {
      width: 50%;
      height: 100%;
      .echarts {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>