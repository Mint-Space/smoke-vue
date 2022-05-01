<template>
  <div></div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CAbout",
  components: {},
  data() {
    return {
      baiduVoice: [],
    };
  },
  methods: {
    ...mapActions("buildingStore", ["setBaiduVoiceList"]),
    getAudioData(text) {
      this.setBaiduVoiceList(text);
    },
    async getAudio() {
      if (this.baiduVoice.length) {
        try {
          var audio = new Audio();
          console.log(this.baiduVoice[0].src);
          audio.setAttribute("src", this.baiduVoice[0].src);
          await audio.play();
          audio = null;
        } catch (err) {
          console.log(err);
        }
        this.baiduVoice.splice(0, 1);
      }
    },
  },
  computed: {
    ...mapState("buildingStore", ["baiduVoiceList"]),
  },
  watch: {
    baiduVoiceList(newBaiduVoiceList) {
      this.baiduVoice.push(newBaiduVoiceList[0]);
      this.getAudio();
    },
  },
  mounted() {
    this.getAudioData("你好世界，我是墨染！");
  },
  updated() {},
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
</style>