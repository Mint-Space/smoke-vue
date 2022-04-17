<template>
  <div class="floor">
    <div class="cat" :style="cssVars">
      <slot></slot>
    </div>
    <c-floor-box v-for="(item, index) in alarms" :key="index" :alarms="item">
    </c-floor-box>
  </div>
</template>

<script>
import CFloorBox from "./floorBox.vue";
export default {
  name: "CFloors",
  components: {
    CFloorBox,
  },
  props: {
    alarms: {
      type: Array,
    },
  },
  data() {
    return {
      maxAlarm: 0,
      color: "rgb(55, 172, 107)",
    };
  },
  methods: {
    getMaxAlarm() {
      let result = 0;
      this.alarms.forEach((value) => {
        if (result < value) {
          result = value;
        }
      });
      return result;
    },
    alarm() {
      if (this.maxAlarm === 0) {
        this.color = "rgb(55, 172, 107)";
      } else if (this.maxAlarm === 4) {
        this.color = "rgb(209, 56, 56)";
      } else if (this.maxAlarm === 3) {
        this.color = "rgb(111, 144, 216)";
      } else if (this.maxAlarm === 2) {
        this.color = "rgb(221, 198, 65)";
      } else if (this.maxAlarm === 1) {
        this.color = "rgb(138, 138, 138)";
      } else {
        this.color = "rgb(218, 218, 218)";
      }
    },
  },
  computed: {
    cssVars() {
      return {
        "--color": this.color,
      };
    },
  },
  mounted() {
    this.maxAlarm = this.getMaxAlarm();
    this.alarm();
  },
};
</script>

<style lang="less" scoped>
.floor {
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
  position: relative;
  .cat {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 1;
    &:hover {
      background-color: var(--color);
      opacity: 100;
      box-shadow: 3px 5px 15px rgb(218, 211, 211);
    }
  }
}
</style>