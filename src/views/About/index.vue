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
      text: [
        "友谊楼一层103房间火警",
        "研究生楼一层133房间离线",
        "本科生楼一层109房间防拆",
        "教师楼一层113房间亏电",
      ],
      textToVoice: [],
      audio: null,
    };
  },
  methods: {
    ...mapActions("buildingStore", ["setBaiduVoiceList"]),
    getAudioData(text) {
      this.setBaiduVoiceList(text);
    },
    getAudioSrcArr(baiduVoice) {
      const audioSrcArr = [];
      baiduVoice.forEach((value) => {
        audioSrcArr.push(value.src);
      });
      return audioSrcArr;
    },
    async getAudio(audio, audioSrcArr) {
      if (audioSrcArr.length > 0) {
        try {
          audio.preload = true;
          audio.controls = true;
          if (audioSrcArr.length > 1) {
            audio.src = audioSrcArr.pop(); //每次读数组最后一个元素
            audio.addEventListener("ended", playEndedHandler, false);
            await audio.play();
          }
          audio.loop = false; //禁止循环，否则无法触发ended事件
          async function playEndedHandler() {
            try {
              if (audioSrcArr.length > 0) {
                audio.src = audioSrcArr.pop(); //每次读数组最后一个元素
                await audio.play();
              }
              !audioSrcArr.length &&
                audio.removeEventListener("ended", playEndedHandler, false); //只有一个元素时解除绑定
            } catch (err) {
              // console.log("Audio 2", err);
            }
          }
        } catch (err) {
          // console.log("Audio 1", err);
        }
        // audioSrcArr.splice(0, 1);
      }
    },
  },
  computed: {
    ...mapState("buildingStore", ["baiduVoiceList"]),
  },
  watch: {
    baiduVoiceList(newBaiduVoiceList) {
      this.textToVoice = this.getAudioSrcArr(newBaiduVoiceList);
      if (this.textToVoice.length > 0) {
        this.getAudio(this.audio, this.textToVoice);
      }
    },
  },
  mounted() {
    this.audio = new Audio();
    for (let index = 0; index < this.text.length; index++) {
      const element = this.text[index];
      this.getAudioData(element);
    }
  },
  updated() {},
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
</style>