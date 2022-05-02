<template>
  <div :style="cssVars">
    <slot></slot>
    <div
      class="room"
      :style="{ height: heights, width: widths }"
      @click="$emit('optionSmokeStatus')"
    >
      {{ roomNumber }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CRoom",
  props: {
    room: {
      type: Object,
    },
    heights: {
      type: String,
    },
    widths: {
      type: String,
    },
  },
  data() {
    return {
      alarmStatus: 0,
      roomNumber: this.room.room,
      time: this.room.time,
      color: "rgb(55, 172, 107)",
      animationPlay: "paused",
      opacity: "1",
    };
  },
  computed: {
    cssVars() {
      return {
        "--color": this.color,
        "--animationPlay": this.animationPlay,
        "--opacity": this.opacity,
      };
    },
  },
  methods: {
    alarm() {
      if (this.alarmStatus === 0) {
        this.animationPlay = "paused";
        this.opacity = "1";
        this.color = "rgb(55, 172, 107)";
      } else if (this.alarmStatus === 1) {
        this.animationPlay = "running";
        this.color = "rgb(138, 138, 138)";
      } else if (this.alarmStatus === 2) {
        this.animationPlay = "running";
        this.color = "rgb(221, 198, 65)";
      } else if (this.alarmStatus === 3) {
        this.animationPlay = "running";
        this.color = "rgb(111, 144, 216)";
      } else if (this.alarmStatus === 4) {
        this.animationPlay = "running";
        this.color = "rgb(209, 56, 56)";
      } else {
        this.color = "rgb(218, 218, 218)";
        this.animationPlay = "paused";
        this.opacity = "1";
      }
    },
  },
  watch: {
    room: {
      handler(room) {
        this.alarmStatus = room.smokeStatus;
        this.alarm();
        return room;
      },
      deep: true,
      immediate: true,
    },
    // room(room) {
    //   this.alarmStatus = room.smokeStatus;
    //   this.alarm();
    //   return room
    // },
  },
  created() {
    this.alarmStatus = this.room.smokeStatus;
    this.alarm();
  },
  updated() {},
};
</script>

<style lang="less" scoped>
.room {
  // width: 3.75rem;
  // height: 8.75rem;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(252, 216, 216);
  background-color: var(--color);
  animation-name: blink;
  animation-play-state: var(--animationPlay);
  animation-duration: 1s;
  animation-iteration-count: infinite;
  color: #fff;
  padding-right: 10px;
  padding-left: 10px;
  opacity: var(--opacity);
  &:hover {
    animation-play-state: paused;
    opacity: 1;
    box-shadow: 3px 5px 15px rgb(218, 211, 211);
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