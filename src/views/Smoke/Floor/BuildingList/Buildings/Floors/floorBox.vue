<template>
  <div class="box" :style="cssVars"></div>
</template>

<script>
export default {
  name: "CFloors",
  data() {
    return {
      alarmStatus: 0,
      color: "rgb(55, 172, 107)",
      animationPlay: "paused",
    };
  },
  props: {
    alarms: {
      type: Number,
    },
  },
  methods: {
    alarm() {
      if (this.alarmStatus === 0) {
        this.animationPlay = "paused";
        this.color = "rgb(55, 172, 107)";
      } else if (this.alarmStatus === 4) {
        this.animationPlay = "running";
        this.color = "rgb(209, 56, 56)";
      }else if (this.alarmStatus === 3) {
        this.animationPlay = "running";
        this.color = "rgb(111, 144, 216)";
      } else if (this.alarmStatus === 2) {
        this.animationPlay = "running";
        this.color = "rgb(221, 198, 65)";
      } else if (this.alarmStatus === 1) {
        this.animationPlay = "running";
        this.color = "rgb(138, 138, 138)";
      } else {
        this.color = "rgb(218, 218, 218)";
        this.animationPlay = "paused";
      }
    },
  },
  created() {
    this.alarmStatus = this.alarms;
    this.alarm();
  },
  computed: {
    cssVars() {
      return {
        "--color": this.color,
        "--animationPlay": this.animationPlay,
      };
    },
  },
  watch: {
    alarms() {
      this.alarmStatus = this.alarms;
      this.alarm();
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-grow: 1;
  width: 100%;
  background-color: var(--color);
  animation-name: blink;
  animation-play-state: var(--animationPlay);
  animation-duration: 1s;
  animation-iteration-count: infinite;
  color: #fff;
  position: relative;
  &:hover {
    animation-play-state: paused;
    opacity: 100;
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