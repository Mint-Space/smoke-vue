<template>
  <div class="legend">
    <div class="box mute" v-show="isMute" @click="setMute()">消音</div>
    <div class="box alarm">火警</div>
    <div class="box dismantle">拆除</div>
    <div class="box off-line">离线</div>
    <div class="box under-voltage">亏电</div>
    <div class="box normal">正常</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CLegend",
  components: {},
  data() {
    return {
      isMute: false,
      // baiduVoice: [],
      text: [],
      textToVoice: [],
      audio: null,
    };
  },
  methods: {
    ...mapActions("buildingStore", ["setBaiduVoiceList"]),
    ...mapActions("buildingStore", ["createAudio"]),
    ...mapActions("buildingStore", ["setAudioMute"]),
    ...mapActions("buildingStore", ["setBaiduVoiceListToNull"]),
    setMute() {
      this.isMute = false;
      this.setAudioMute();
      this.setBaiduVoiceListToNull();
    },
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
    ...mapState("buildingStore", ["baiduVoiceTextList"]),
    ...mapState("buildingStore", ["audioPlayer"]),
  },
  watch: {
    baiduVoiceTextList(newBaiduVoiceTextList) {
      this.text = newBaiduVoiceTextList;
      this.isMute = true;
      for (let index = 0; index < this.text.length; index++) {
        const element = this.text[index];
        this.getAudioData(element);
      }
    },
    baiduVoiceList(newBaiduVoiceList) {
      this.textToVoice = this.getAudioSrcArr(newBaiduVoiceList);
      if (this.textToVoice.length > 0) {
        this.isMute = true;
        this.getAudio(this.audio, this.textToVoice);
      }
    },
  },
  mounted() {
    this.text = this.baiduVoiceTextList;
    for (let index = 0; index < this.text.length; index++) {
      const element = this.text[index];
      this.getAudioData(element);
    }
    if (this.text.length > 0) {
      this.createAudio();
      this.audio = this.audioPlayer;
      this.getAudio(this.audio, this.textToVoice);
    }
  },
  destroyed() {},
};
</script>

<style lang="less" scoped>
.legend {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .box {
    width: 80px;
    height: 40px;
    border-radius: 10px;
    padding: 5px;
    margin: 20px 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      box-shadow: 3px 3px 10px rgb(180, 173, 173);
    }
  }
  .mute {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 5px;
    margin: 20px 20px;
    font-size: 25px;
    background-color: rgb(209, 87, 56);
  }
  .alarm {
    background-color: rgb(209, 56, 56);
  }
  .dismantle {
    background-color: rgb(111, 144, 216);
  }
  .off-line {
    background-color: rgb(138, 138, 138);
  }
  .under-voltage {
    background-color: rgb(221, 198, 65);
  }
  .normal {
    background-color: rgb(55, 172, 107);
  }
}
</style>