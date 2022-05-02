import { post } from "@/plugins/http.js"
let baiduVoiceList = []
let textToVoice = ''
const urlApi = "/baidu"
baiduVoice.play = function () {
    console.log(baiduVoiceList, '1222222222222')
    if (baiduVoiceList.length) {
        // 播放
        var audio = new Audio();
        audio.setAttribute("src", baiduVoiceList[0].src);
        audio.play();
        audio = null;

        // // 及时删除数组0
        baiduVoiceList.splice(0, 1);
    }
    return baiduVoice
}

function baiduVoice(text) {
    textToVoice = text
    //以下参数参考api文档，token和人的声音音色之类的参数
    var param = {
        tex: textToVoice, //合成的文本
        tok: "24.11994fde9411f014f1082da55c7ff56b.2592000.1653953620.282335-26137608", //这个token要换成自己的
        spd: 5, //默认为5中语速
        pit: 5, //5中语调
        vol: 15, //音量，取值0-15，默认为5中音量
        per: 4, //基础音库
        ctp: 1, //web
        lan: "zh", //中文
    };
    var url = urlApi;
    var p = param || {};
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
                    baiduVoiceList.push({
                        src: URL.createObjectURL(xhr.response),
                        size: xhr.response.size,
                    });
                    return baiduVoice
                } else {
                    //这里如果百度语音合成的接口返回类型不是audio/mp3，是json的话，代表你的参数有问题，返回结果失败，具体可以查看api文档
                    alert("调用语音合成接口token已失效!");
                }
            } else {
                alert("语音合成接口调用失败!");
            }
        }
    };
    return baiduVoice
}

async function baiduVoiceAxios(text) {
    textToVoice = text
    //以下参数参考api文档，token和人的声音音色之类的参数
    var param = {
        tex: textToVoice, //合成的文本
        tok: "24.11994fde9411f014f1082da55c7ff56b.2592000.1653953620.282335-26137608", //这个token要换成自己的
        spd: 5, //默认为5中语速
        pit: 5, //5中语调
        vol: 15, //音量，取值0-15，默认为5中音量
        per: 4, //基础音库
        ctp: 1, //web
        lan: "zh", //中文
    };
    var url = urlApi;
    var p = param || {};

    var data = {};
    for (var p in param) {
        data[p] = param[p];
    } // 赋值预定义参数
    data.cuid = data.cuid || data.tok; //以上为封装请求的参数 // 序列化参数列表
    const resultData = []
    return await post(url, data).then((data) => {
        if (data.request.readyState == 4) {
            if (data.status == 200) {
                if (data.headers["content-type"] == "audio/mp3") {
                    //  保存数据

                    // const { headers, data } = res,
                    //     // 从响应头中获取文件名，*如果network中能看到content-disposition，代码无法获取，需后端配置
                    //     filename = decodeURI(headers["content-disposition"].split("filename=")[1]),
                    //     blob = new Blob([data], { type: headers["content-type"] });
                    // saveAs(blob, filename)

                    resultData.push(Object.assign({
                        src: window.URL.createObjectURL(new Blob([data.request.response], { type: data.headers["content-type"] })),
                        size: data.headers["content-length"],
                    }));
                    return resultData
                } else {
                    //这里如果百度语音合成的接口返回类型不是audio/mp3，是json的话，代表你的参数有问题，返回结果失败，具体可以查看api文档
                    alert("调用语音合成接口token已失效!");
                }
            } else {
                alert("语音合成接口调用失败!");
            }
        }
        return resultData
    })
}
export { baiduVoice, baiduVoiceAxios }