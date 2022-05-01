<template>
  <div>百度语音,浏览器默认拒绝自动播放音频，需要的话得手动设置</div>
</template>
<script>
export default {
  data() {
    return {
      list: [], //保存音频
    };
  },
  mounted() {
    this.btts("银河航天");
    setTimeout(() => {
      this.btts("你最最最最最好看");
    }, 1000);
    setTimeout(() => {
      this.btts("哈哈哈哈");
    }, 1200);

    // 以上三次模拟预警弹框，弹框一出开始播放，第二条语音在第一条音频播完紧跟上。

    // 计时器保证三条音频可以紧跟上
    this.playTime = setInterval(() => {
      this.play();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.playTime);
  },
  methods: {
    play() {
      // console.log(this.list,'1222222222222')
      if (this.list.length) {
        // 播放
        var audio = new Audio();
        audio.setAttribute("src", this.list[0].src);
        audio.play();
        audio = null;

        // 及时清除计时器，避免重叠
        clearInterval(this.playTime);

        // 在第一条音频播放时间后重新开启计时器
        this.playTime = setInterval(() => {
          this.play();
        }, this.list[0].size);

        // 及时删除数组0
        this.list.splice(0, 1);
      }
    },
    btts(text) {
      console.log(text, "文本"); //以下参数参考api文档，token和人的声音音色之类的参数
      var param = {
        tex: text, //合成的文本
        tok: "24.11994fde9411f014f1082da55c7ff56b.2592000.1653953620.282335-26137608", //这个token要换成自己的
        spd: 5, //默认为5中语速
        pit: 5, //5中语调
        vol: 15, //音量，取值0-15，默认为5中音量
        per: 4, //基础音库
        ctp: 1, //web
        lan: "zh", //中文
      };
      var url = "/baidu";
      var p = param || {};
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url); // 创建form参数

      var data = {};
      for (var p in param) {
        data[p] = param[p];
      } // 赋值预定义参数
      data.cuid = data.cuid || data.tok; //以上为封装请求的参数 // 序列化参数列表
      // data.ctp = 1;
      // data.lan = data.lan || 'zh';
      var fd = [];
      for (var k in data) {
        fd.push(k + "=" + encodeURIComponent(data[k]));
      }

      var frd = new FileReader();
      xhr.responseType = "blob";
      xhr.send(fd.join("&")); //请求返回结果处理

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            if (xhr.response.type == "audio/mp3") {
              //  保存数据
              that.list.push({
                src: URL.createObjectURL(xhr.response),
                size: xhr.response.size,
              });
            } else {
              //这里如果百度语音合成的接口返回类型不是audio/mp3，是json的话，代表你的参数有问题，返回结果失败，具体可以查看api文档
              alert("调用语音合成接口token已失效!");
            }
          } else {
            alert("语音合成接口调用失败!");
          }
        }
      };
    },
  },
};
</script>
<style scoped>
</style>
