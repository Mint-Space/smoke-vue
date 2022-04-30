<template>
  <div class="box">
    <!-- <c-user></c-user> -->
    <el-row :gutter="20">
      <el-col :span="6">
        <c-user></c-user>
      </el-col>
      <el-col :span="18">
        <div class="smoke-container">
          <c-smoke-info></c-smoke-info>
          <c-smoke-status></c-smoke-status>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CUser from "./User";
import CSmokeStatus from "./SmokeStatus";
import CSmokeInfo from "./SmokeInfo";
export default {
  name: "CHome",
  components: {
    CUser,
    CSmokeStatus,
    CSmokeInfo,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.smoke-container {
  display: flex;
  flex-flow: column;
}
</style>