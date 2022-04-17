<template>
  <div class="floor">
    <div>
      <div class="title">
        <h3 class="user">用户：{{ user.username }}</h3>
        <div class="name">
          <h2>{{ buildName }}</h2>
          <h2>{{ floorName }}</h2>
        </div>
        <h3 class="date">{{ dateFormat("YYYY-mm-dd HH:MM", new Date()) }}</h3>
      </div>
      <div class="rooms">
        <div class="singular">
          <c-room
            v-for="room in roomSingular"
            :key="room.id"
            :room="room"
            :heights="roomHeights"
            :widths="roomWidths"
            @optionSmokeStatus="optionSmokeStatus(buildName, floorName, room)"
          ></c-room>
        </div>
        <div class="corridor-box">
          <div class="staircases">
            <c-room
              v-for="staircase in staircases"
              :key="staircase.id"
              :room="staircase"
              :heights="heights"
              :widths="widths"
              @optionSmokeStatus="
                optionSmokeStatus(buildName, floorName, staircase)
              "
            ></c-room>
            <div class="corridors">
              <c-room
                v-for="corridor in corridors"
                :key="corridor.id"
                :room="corridor"
                :heights="heights"
                :widths="widths"
                @optionSmokeStatus="
                  optionSmokeStatus(buildName, floorName, corridor)
                "
              ></c-room>
            </div>
          </div>
        </div>
        <div class="even">
          <c-room
            v-for="room in roomEven"
            :key="room.id"
            :room="room"
            :heights="roomHeights"
            :widths="roomWidths"
            @optionSmokeStatus="optionSmokeStatus(buildName, floorName, room)"
          ></c-room>
        </div>
      </div>
    </div>
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
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CRoom from "./Room";
import { mapState } from "vuex";
export default {
  name: "CFloorTemplate",
  components: {
    CRoom,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      heights: "50px",
      widths: "auto",
      roomHeights: "8.75rem",
      roomWidths: "3.75rem",
      username: "张三",
      buildData: [],
      buildName: "",
      floorName: "",
      rooms: [],
      roomEven: [],
      roomSingular: [],
      staircases: [],
      corridors: [],
      dialogVisible: false,
      dialogTitle: "",
      isShowAlarm: false,
      count: this.clickEventAndKeyboardEventCount | 0,
    };
  },
  methods: {
    getRoomEven(rooms) {
      const result = [];
      rooms.forEach((room, index) => {
        if (index % 2 != 0) {
          result.push(room);
        }
      });
      return result;
    },
    getRoomSingular(rooms) {
      const result = [];
      rooms.forEach((room, index) => {
        if (index % 2 == 0) {
          result.push(room);
        }
      });
      return result;
    },
    optionSmokeStatus(buildName, floorName, room) {
      const info = "请即时查看";
      if (room.smokeStatus > 0) {
        this.dialogVisible = true;
        if (room.smokeStatus == 1) {
          this.dialogTitle =
            buildName + floorName + room.room + "位置离线" + info;
          this.isShowAlarm = false;
        } else if (room.smokeStatus == 2) {
          this.dialogTitle =
            buildName + floorName + room.room + "位置亏电" + info;
          this.isShowAlarm = false;
        } else if (room.smokeStatus == 3) {
          this.dialogTitle =
            buildName + floorName + room.room + "位置拆除" + info;
          this.isShowAlarm = false;
        } else if (room.smokeStatus == 4) {
          this.dialogTitle =
            buildName + floorName + room.room + "位置火警" + info;
          this.isShowAlarm = true;
        } else {
          this.dialogTitle =
            buildName + floorName + room.room + "位置设备异常" + info;
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
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
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
        this.buildData.push(
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
        this.staircases.push(
          Object.assign(
            { build: build[index] },
            { floor: floor[index] },
            { room: staircaseName[index] },
            { times: staircaseTimes[index] },
            { smokeStatus: parseInt(staircaseSmokeStatus[index]) },
            { deviceType: parseInt(staircaseDeviceType[index]) }
          )
        );
      }
      for (let index = 0; index < corridorName.length; index++) {
        this.corridors.push(
          Object.assign(
            { build: build[index] },
            { floor: floor[index] },
            { room: corridorName[index] },
            { times: corridorTimes[index] },
            { smokeStatus: parseInt(corridorSmokeStatus[index]) },
            { deviceType: parseInt(corridorDeviceType[index]) }
          )
        );
      }
    },
  },
  computed: {
    ...mapState("buildingStore", ["build"]),
  },
  watch: {
    build(newBuild) {
      const rooms = newBuild.rooms;
      this.buildName = newBuild.build;
      this.floorName = newBuild.floorName;
      this.roomEven = this.getRoomEven(rooms);
      this.roomSingular = this.getRoomSingular(rooms);
    },
    
  },
  created() {
    const build = window.localStorage.getItem("build");
    if ((build === "undefined") | (build === "") | (build === null)) {
      this.buildName = this.build.build;
      this.floorName = this.build.floorName;
      this.saveBuildDataToStorage();
      this.roomEven = this.getRoomEven(this.build.rooms);
      this.roomSingular = this.getRoomSingular(this.build.rooms);
    } else {
      this.getBuildDataFromStorage();
      this.buildName = this.buildData[0].build;
      this.floorName = this.buildData[0].floor;
      this.roomEven = this.getRoomEven(this.buildData);
      this.roomSingular = this.getRoomSingular(this.buildData);
    }
  },
  updated() {
    const build = window.localStorage.getItem("build");
    if (
      (build === "undefined") |
      (build === "") |
      (build === null) |
      (build != this.build.build)
    ) {
      this.buildName = this.build.build;
      this.floorName = this.build.floorName;
      this.saveBuildDataToStorage();
    } else {
      this.buildName = this.buildData[0].build;
      this.floorName = this.buildData[0].floor;
      this.getBuildDataFromStorage();
    }
  },
  destroyed() {},
};
</script>

<style lang="less" scoped>
.floor {
  width: auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .title {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .user {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      margin-left: 0;
      color: rgb(85, 134, 199);
    }
    .name {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      margin: 5px 10px;
      color: rgb(85, 134, 199);
      h2 {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
      }
    }
    .date {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;
      align-items: center;
      margin-right: 0;
      color: rgb(85, 134, 199);
    }
  }
}
.rooms {
  width: auto;
  .singular,
  .even {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(219, 219, 219);
  }
  .corridor-box {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(187, 187, 187);
    padding-top: 25px;
    padding-bottom: 25px;
    width: 100%;
    .staircases {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      .corridors {
        position: absolute;
        left: 10%;
        width: 80%;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>