<template>
  <div class="floor">
    <c-floor-template :user="user"></c-floor-template>
  </div>
</template>

<script>
import CFloorTemplate from "../FloorTemplate";
export default {
  name: "CRooms",
  components: {
    CFloorTemplate,
  },
  data() {
    return {
      user: {
        username: "张三",
      },
    };
  },
  methods: {
    toSingularAndEven(rooms, times, smokeStatus) {
      for (let index = 0; index < rooms.length; index++) {
        if (rooms[index] % 2 == 0) {
          this.roomEven.push({
            rooms: rooms[index],
            times: times[index],
            smokeStatus: smokeStatus[index],
          });
        } else {
          this.roomSingular.push({
            rooms: rooms[index],
            times: times[index],
            smokeStatus: smokeStatus[index],
          });
        }
      }
    },
    setBuildRooms() {
      const rooms = this.build.rooms;
      let roomName = [];
      let times = [];
      let smokeStatus = [];
      rooms.forEach((room) => {
        roomName.push(room.name);
        times.push(room.time);
        smokeStatus.push(room.smokeStatus);
      });
      this.toSingularAndEven(roomName, times, smokeStatus);
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
      const build = this.build.build;
      const floor = this.build.floorName;
      const rooms = this.build.rooms;
      const roomsName = [];
      const timesArr = [];
      const smokeStatusArr = [];
      rooms.forEach((room) => {
        roomsName.push(room.name);
        timesArr.push(room.time);
        smokeStatusArr.push(room.smokeStauts);
      });
      if (build) {
        window.localStorage.setItem("build", build);
        window.localStorage.setItem("floor", floor);
        window.localStorage.setItem("rooms", roomsName);
        window.localStorage.setItem("times", timesArr);
        window.localStorage.setItem("smokeStatus", smokeStatusArr);
      }
      this.toSingular(roomsName, timesArr, smokeStatusArr);
    },
    getBuildDataFromStorage() {
      const getSotage = window.localStorage.getItem("rooms");
      if ((getSotage !== "undefined") & (getSotage !== "")) {
        const rooms = window.localStorage.getItem("rooms").split(",");
        const smokeStatus = window.localStorage
          .getItem("smokeStatus")
          .split(",");
        const times = window.localStorage.getItem("times").split(",");
        const roomsArr = [];
        const smokeStatusArr = [];
        const timesArr = [];
        for (let index = 0; index < rooms.length; index++) {
          roomsArr.push(parseInt(rooms[index]));
          smokeStatusArr.push(parseInt(smokeStatus[index]));
          timesArr.push(times[index]);
        }
        this.toSingular(roomsArr, timesArr, smokeStatusArr);
      }
    },
    getBuildList() {
      return this.$store.state.buildingStore.build;
    },
  },
};
</script>

<style lang="less" scoped>
.floor {
  width: auto;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
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
    }
    .name {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      margin: 5px 10px;
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
  .corridor {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(187, 187, 187);
    padding-top: 15px;
    padding-bottom: 15px;
    width: 100%;
  }
}
</style>