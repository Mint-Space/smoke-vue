<template>
  <div class="building">
    <div v-for="(build, index) in buildingList" :key="index">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{ build.name }}</span>
        </div>
        <div
          v-for="(floors, index) in build.floor"
          :key="index"
          class="text item"
          @click="setBuild(build.name, index)"
        >
          <div class="block">
            <c-floors :alarms="floors.smokeStatus">
              {{ floors.floorName }}
            </c-floors>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import CFloors from "./Floors";
import { mapActions } from "vuex";
export default {
  name: "CBuildings",
  components: {
    CFloors,
  },
  data() {
    return {
      isShowFloor: true,
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      buildingList: [],
      build: [],
    };
  },
  methods: {
    ...mapActions("buildingStore", ["getBuild"]),
    getBuildingList() {
      return this.$store.state.buildingStore.buildingList;
    },
    getBuildList() {
      return this.$store.state.buildingStore.build;
    },
    setBuild(buildName, floorIndex) {
      const buildConfig = {
        buildName,
        floorIndex,
      };
      this.getBuild(buildConfig);
      console.log(this.$route);
      if (this.$route.name == "building") {
        this.$router.push({
          name: "floor",
        });
      } else if (this.$route.name == "table") {
        this.$router.push({
          name: "table",
        });
      }
    },
  },

  created() {
    this.buildingList = this.getBuildingList();
  },
  updated() {},
};
</script>

<style lang="less" scoped>
.building {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: rgb(235, 81, 81);
  }
}
.box-card {
  width: 200px;
  margin: 5px;
}
.floor {
  width: 100%;
  height: 60px;
  border: 1px solid rgb(252, 216, 216);
}
.block {
  position: relative;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>