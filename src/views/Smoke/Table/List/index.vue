<template>
  <div class="table-box">
    <!-- <div class="scrollbar-table"> -->
    <!-- <el-scrollbar style="height: 100%"> -->
    <el-table :data="buildData" border style="width: 100%" height="100%">
      <el-table-column align="center" type="index" width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="build"
        label="建筑名称"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="floor"
        label="烟感手报楼层"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="room"
        label="烟感手报位置"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="time"
        label="设备联网时间"
        width="auto"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceTypeTitle"
        label="设备类型"
        width="auto"
      >
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <div class="search">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              suffix-icon="el-icon-search"
              @keyup.native.enter="searchKey(scope.$index, scope.column)"
            >
              <el-button
                size="mini"
                slot="append"
                @click="searchKey(scope.$index, scope.column)"
                >搜索</el-button
              >
            </el-input>
          </div>
        </template>
        <template slot-scope="scope">
          <el-tag
            :type="smokeStatusValue(scope.$index)"
            :style="cssVars"
            @click="optionSmokeStatus(scope.row)"
            effect="dark"
          >
            {{ setSmokeStatusTitle(scope.$index) }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="烟雾报警器 | 火灾手动报警按钮 现在运行状态"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <span>{{ dialogTitle }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="warning" @click="dialogVisible = false"
          >复位</el-button
        >
        <el-button
          type="danger"
          @click="dialogVisible = false"
          v-show="isShowAlarm"
          >消音</el-button
        >
        <el-button type="primary" @click="dialogVisible = false"
          >屏蔽</el-button
        >
      </span>
    </el-dialog>
    <!-- </el-scrollbar> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "CList",
  data() {
    return {
      search: "",
      buildData: [],
      animationPlay: "paused",
      dialogVisible: false,
      dialogTitle: "",
      isShowAlarm: false,
    };
  },
  methods: {
    ...mapActions("buildingStore", ["setBuildTableList"]),
    sortChange(dataArr) {
      const status = [];
      const alarmStatus = [];
      const dismantleStatus = [];
      const normalStatus = [];
      const offLineStatus = [];
      const underVoltageStatus = [];
      const errorStatus = [];
      for (let index = 0; index < dataArr.length; index++) {
        const arr = dataArr[index];
        if (arr.smokeStatus > 0) {
          if (arr.smokeStatus > 1) {
            if (arr.smokeStatus > 2) {
              if (arr.smokeStatus > 3) {
                alarmStatus.unshift(arr);
              } else if (arr.smokeStatus === 3) {
                dismantleStatus.unshift(arr);
              }
            } else if (arr.smokeStatus === 2) {
              offLineStatus.unshift(arr);
            }
          } else if (arr.smokeStatus === 1) {
            underVoltageStatus.push(arr);
          }
        } else if (arr.smokeStatus === 0) {
          normalStatus.push(dataArr[index]);
        } else {
          errorStatus.push(dataArr[index]);
        }
      }
      errorStatus.forEach((value) => {
        status.push(value);
      });
      alarmStatus.forEach((value) => {
        status.push(value);
      });
      dismantleStatus.forEach((value) => {
        status.push(value);
      });
      offLineStatus.forEach((value) => {
        status.push(value);
      });
      underVoltageStatus.forEach((value) => {
        status.push(value);
      });
      normalStatus.forEach((value) => {
        status.push(value);
      });
      return status;
    },
    getTagStatus(smokeStatus) {
      if (smokeStatus === 0) {
        return "success";
      } else if (smokeStatus === 1) {
        return "info";
      } else if (smokeStatus === 2) {
        return "warning";
      } else if (smokeStatus === 3) {
        return "";
      } else if (smokeStatus === 4) {
        return "danger";
      } else {
        return "";
      }
    },
    smokeStatusValue(index) {
      return this.getTagStatus(this.buildData[index].smokeStatus);
    },
    getTagName(smokeStatus) {
      if (smokeStatus === 0) {
        return "正常";
      } else if (smokeStatus === 1) {
        return "离线";
      } else if (smokeStatus === 2) {
        return "亏电";
      } else if (smokeStatus === 3) {
        return "拆除";
      } else if (smokeStatus === 4) {
        return "火警";
      } else {
        return "异常";
      }
    },
    smokeStatusTitle(index) {
      return this.getTagName(this.buildData[index].smokeStatus);
    },
    setSmokeStatusTitle(index) {
      this.buildData[index] = Object.assign({
        ...this.buildData[index],
        smokeStatusTitle: this.smokeStatusTitle(index),
      });
      return this.buildData[index].smokeStatusTitle;
    },
    alarm(smokeStatus) {
      if (smokeStatus === 0) {
        return "paused";
      } else if (smokeStatus === 1) {
        return "running";
      } else if (smokeStatus === 2) {
        return "running";
      } else if (smokeStatus === 3) {
        return "running";
      } else if (smokeStatus === 4) {
        return "running";
      } else {
        return "paused";
      }
    },
    changeStatus(index) {
      return (this.animationPlay = this.alarm(
        this.buildData[index].smokeStatus
      ));
    },
    optionSmokeStatus(row) {
      const info = "请即时查看";
      if (row.smokeStatus > 0) {
        this.dialogVisible = true;
        if (row.smokeStatus == 1) {
          this.dialogTitle =
            row.build + row.floor + row.room + "位置离线" + info;
          this.isShowAlarm = false;
        } else if (row.smokeStatus == 2) {
          this.dialogTitle =
            row.build + row.floor + row.room + "位置亏电" + info;
          this.isShowAlarm = false;
        } else if (row.smokeStatus == 3) {
          this.dialogTitle =
            row.build + row.floor + row.room + "位置拆除" + info;
          this.isShowAlarm = false;
        } else if (row.smokeStatus == 4) {
          this.dialogTitle =
            row.build + row.floor + row.room + "位置火警" + info;
          this.isShowAlarm = true;
        } else {
          this.dialogTitle =
            row.build + row.floor + row.room + "位置设备异常" + info;
          this.isShowAlarm = false;
        }
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        // eslint-disable-next-line
        .then((_) => {
          done();
        })
        // eslint-disable-next-line
        .catch((_) => {});
    },
    searchKey(index, row) {
      this.tables;
      console.log(index, row);
      var search = this.search;
      if (search) {
        return this.buildData.filter((dataNews) => {
          return Object.keys(dataNews).some((key) => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.buildData;
    },
    showSmokeAndManualAlarmButtonTitle(buildDataList) {
      let result = [];
      buildDataList.forEach((value) => {
        if (value.deviceType === 0) {
          result.push(
            Object.assign({
              ...value,
              deviceTypeTitle: "烟雾报警器",
            })
          );
        } else {
          result.push(
            Object.assign({
              ...value,
              deviceTypeTitle: "火灾手动报警按钮",
            })
          );
        }
      });
      return result;
    },
    packBuild(building) {
      const result = [];
      const build = building.build;
      const floor = building.floorName;
      building.rooms.forEach((room) => {
        result.push(
          Object.assign({
            build: build,
            floor: floor,
            room: room.name,
            time: room.time,
            smokeStatus: room.smokeStatus,
            deviceType: room.deviceType,
          })
        );
      });
      return result;
    },
    packBuildingData(building) {
      const result = [];
      const build = building.build;
      const floor = building.floorName;
      const rooms = building.rooms;
      const staircase = building.staircase;
      const corridor = building.corridor;
      for (let index = 0; index < rooms.length; index++) {
        result.push(
          Object.assign(
            { build: build },
            { floor: floor },
            { room: rooms[index].room },
            { time: rooms[index].time },
            { smokeStatus: parseInt(rooms[index].smokeStatus) },
            { deviceType: parseInt(rooms[index].deviceType) }
          )
        );
      }
      for (let index = 0; index < staircase.length; index++) {
        result.push(
          Object.assign(
            { build: build },
            { floor: floor },
            { room: staircase[index].room },
            { time: staircase[index].time },
            { smokeStatus: parseInt(staircase[index].smokeStatus) },
            { deviceType: parseInt(staircase[index].deviceType) }
          )
        );
      }
      for (let index = 0; index < corridor.length; index++) {
        result.push(
          Object.assign(
            { build: build },
            { floor: floor },
            { room: corridor[index].room },
            { time: corridor[index].time },
            { smokeStatus: parseInt(corridor[index].smokeStatus) },
            { deviceType: parseInt(corridor[index].deviceType) }
          )
        );
      }
      return result;
    },
    saveBuildDataToStorage() {
      const buildList = this.build;
      const build = buildList.build;
      const floor = buildList.floorName;
      const rooms = buildList.rooms;
      const staircase = buildList.staircase;
      const corridor = buildList.corridor;
      const buildName = [];
      const floorName = [];
      const roomsName = [];
      const times = [];
      const smokeStatus = [];
      const staircaseName = [];
      const staircaseTimes = [];
      const staircaseSmokeStatus = [];
      const corridorName = [];
      const corridorTimes = [];
      const corridorSmokeStatus = [];
      const deviceType = [];
      const staircaseDeviceType = [];
      const corridorDeviceType = [];
      rooms.forEach((value) => {
        buildName.push(build);
        floorName.push(floor);
        roomsName.push(value.room);
        times.push(value.time);
        smokeStatus.push(value.smokeStatus);
        deviceType.push(value.deviceType);
      });
      staircase.forEach((value) => {
        staircaseName.push(value.room);
        staircaseTimes.push(value.time);
        staircaseSmokeStatus.push(value.smokeStatus);
        staircaseDeviceType.push(value.deviceType);
      });
      corridor.forEach((value) => {
        corridorName.push(value.room);
        corridorTimes.push(value.time);
        corridorSmokeStatus.push(value.smokeStatus);
        corridorDeviceType.push(value.deviceType);
      });

      this.buildName = build;
      this.floorName = floor;
      this.staircases = staircase;
      this.corridors = corridor;
      window.localStorage.setItem("build", buildName);
      window.localStorage.setItem("floor", floorName);
      window.localStorage.setItem("rooms", roomsName);
      window.localStorage.setItem("times", times);
      window.localStorage.setItem("smokeStatus", smokeStatus);
      window.localStorage.setItem("staircaseName", staircaseName);
      window.localStorage.setItem("staircaseTimes", staircaseTimes);
      window.localStorage.setItem("staircaseSmokeStatus", staircaseSmokeStatus);
      window.localStorage.setItem("corridorName", corridorName);
      window.localStorage.setItem("corridorTimes", corridorTimes);
      window.localStorage.setItem("corridorSmokeStatus", corridorSmokeStatus);
      window.localStorage.setItem("deviceType", deviceType);
      window.localStorage.setItem("staircaseDeviceType", staircaseDeviceType);
      window.localStorage.setItem("corridorDeviceType", corridorDeviceType);
    },
    getBuildDataFromStorage() {
      const result = [];
      const build = window.localStorage.getItem("build").split(",");
      const floor = window.localStorage.getItem("floor").split(",");
      const rooms = window.localStorage.getItem("rooms").split(",");
      const times = window.localStorage.getItem("times").split(",");
      const smokeStatus = window.localStorage.getItem("smokeStatus").split(",");
      const deviceType = window.localStorage.getItem("deviceType").split(",");
      const staircaseDeviceType = window.localStorage
        .getItem("staircaseDeviceType")
        .split(",");
      const corridorDeviceType = window.localStorage
        .getItem("corridorDeviceType")
        .split(",");
      const staircaseName = window.localStorage
        .getItem("staircaseName")
        .split(",");
      const staircaseTimes = window.localStorage
        .getItem("staircaseTimes")
        .split(",");
      const staircaseSmokeStatus = window.localStorage
        .getItem("staircaseSmokeStatus")
        .split(",");
      const corridorName = window.localStorage
        .getItem("corridorName")
        .split(",");
      const corridorTimes = window.localStorage
        .getItem("corridorTimes")
        .split(",");
      const corridorSmokeStatus = window.localStorage
        .getItem("corridorSmokeStatus")
        .split(",");
      for (let index = 0; index < rooms.length; index++) {
        result.push(
          Object.assign(
            { build: build[index] },
            { floor: floor[index] },
            { room: parseInt(rooms[index]) },
            { time: times[index] },
            { smokeStatus: parseInt(smokeStatus[index]) },
            { deviceType: parseInt(deviceType[index]) }
          )
        );
      }
      for (let index = 0; index < staircaseName.length; index++) {
        result.push(
          Object.assign(
            { build: build[index] },
            { floor: floor[index] },
            { room: staircaseName[index] },
            { time: staircaseTimes[index] },
            { smokeStatus: parseInt(staircaseSmokeStatus[index]) },
            { deviceType: parseInt(staircaseDeviceType[index]) }
          )
        );
      }
      for (let index = 0; index < corridorName.length; index++) {
        result.push(
          Object.assign(
            { build: build[index] },
            { floor: floor[index] },
            { room: corridorName[index] },
            { time: corridorTimes[index] },
            { smokeStatus: parseInt(corridorSmokeStatus[index]) },
            { deviceType: parseInt(corridorDeviceType[index]) }
          )
        );
      }
      return result;
    },
    saveAndGet() {
      const build = window.localStorage.getItem("build");
      if ((build === "undefined") | (build === "") | (build === null)) {
        this.buildData = this.packBuildingData(this.build);
        this.buildData = this.showSmokeAndManualAlarmButtonTitle(
          this.buildData
        );
        this.buildData = this.sortChange(this.buildData);
        this.setBuildTableList(this.buildData);
        this.saveBuildDataToStorage();
      } else {
        this.buildData = this.getBuildDataFromStorage();
        this.buildData = this.showSmokeAndManualAlarmButtonTitle(
          this.buildData
        );
        this.buildData = this.sortChange(this.buildData);
        this.setBuildTableList(this.buildData);
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  computed: {
    ...mapState("buildingStore", ["build"]),
    cssVars() {
      return {
        "--animationPlay": this.animationPlay,
      };
    },
    tables: function () {
      var search = this.search;
      if (search) {
        return this.buildData.filter(function (dataNews) {
          return Object.keys(dataNews).some(function (key) {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.buildData;
    },
  },
  watch: {
    build: {
      handler(newBuild) {
        this.saveBuildDataToStorage();
        this.buildData = this.getBuildDataFromStorage();
        this.buildData = this.showSmokeAndManualAlarmButtonTitle(
          this.buildData
        );
        this.buildData = this.sortChange(this.buildData);
        this.setBuildTableList(this.buildData);
      },
      deep: true,
      immediate: true,
    },
    // build(newBuild) {
    //   this.saveBuildDataToStorage();
    //   this.buildData = this.getBuildDataFromStorage();
    //   this.buildData = this.showSmokeAndManualAlarmButtonTitle(this.buildData);
    //   this.buildData = this.sortChange(this.buildData);
    //   this.setBuildTableList(this.buildData);
    // },
  },
  created() {
    this.saveAndGet();
  },
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<style lang="less" >
.table-box {
  width: 100%;
  height: 100%;
}
.el-table {
  height: 100%;
}
.search {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}
.el-tag {
  animation-name: blink;
  animation-play-state: var(--animationPlay);
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.dialog-footer {
}
/* scoped 需要去掉,不去掉,下面overflow-x: hidden;不会生效 */
.scrollbar-table {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #eee;
  /* 需要在外层套一个div,切记命名特殊一点,防止因缺少scoped，对其他页面会有冲突 */
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

@keyframes blink {
  0% {
    opacity: 100;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
}
</style>