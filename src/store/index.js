import Vue from 'vue'
import Vuex from 'vuex'
import { baiduVoiceAxios } from "@/utils/baiduVoice";

Vue.use(Vuex)

const buildingStore = {
  namespaced: true,//开启命名空间
  state: {
    buildingList: [
      {
        name: "友谊楼",
        floor: [
          {
            build: '友谊楼',
            floorName: "1F",
            smokeStatus: [4, 3, 2, 1],
            staircase: [
              {
                id: 121,
                room: '东楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
              {
                id: 122,
                room: '西楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
            ],
            corridor: [
              {
                id: 121,
                room: '走廊1',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 122,
                room: '走廊2',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 123,
                room: '走廊3',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
            rooms: [
              {
                id: 101,
                room: 101,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 102,
                room: 102,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 103,
                room: 103,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 104,
                room: 104,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 105,
                room: 105,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 106,
                room: 106,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 107,
                room: 107,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 108,
                room: 108,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 109,
                room: 109,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 110,
                room: 110,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 111,
                room: 111,
                smokeStatus: 4,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 112,
                room: 112,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 113,
                room: 113,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 114,
                room: 114,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 115,
                room: 115,
                smokeStatus: 3,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 116,
                room: 116,
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 117,
                room: 117,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 118,
                room: 118,
                smokeStatus: 2,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 119,
                room: 119,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              }
            ],
          },
          {
            build: '友谊楼',
            floorName: "2F",
            smokeStatus: [0],
            staircase: [
              {
                id: 121,
                room: '东楼梯口',
                smokeStatus: 3,
                time: "2022-4-2",
                deviceType: 1
              },
              {
                id: 122,
                room: '西楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
            ],
            corridor: [
              {
                id: 121,
                room: '走廊1',
                smokeStatus: 4,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 122,
                room: '走廊2',
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 123,
                room: '走廊3',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
            rooms: [
              {
                id: 201,
                room: 201,
                smokeStatus: 0,
                time: "2022-3-2",
                deviceType: 0
              },
              {
                id: 202,
                room: 202,
                smokeStatus: 0,
                time: "2022-3-2",
                deviceType: 0
              },
              {
                id: 203,
                room: 203,
                smokeStatus: 0,
                time: "2022-3-2",
                deviceType: 0
              },
              {
                id: 204,
                room: 204,
                smokeStatus: 0,
                time: "2022-3-2",
                deviceType: 0
              },
              {
                id: 205,
                room: 205,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 206,
                room: 206,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 207,
                room: 207,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 208,
                room: 208,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 209,
                room: 209,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 210,
                room: 210,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 211,
                room: 211,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 212,
                room: 212,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 213,
                room: 213,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 214,
                room: 214,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 215,
                room: 215,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 216,
                room: 216,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 217,
                room: 217,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 218,
                room: 218,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 219,
                room: 219,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 220,
                room: 220,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              }
            ],
          },
        ],
      },
      {
        name: "研究生楼",
        floor: [
          {
            build: '研究生楼',
            floorName: "1F",
            smokeStatus: [2, 1],
            staircase: [
              {
                id: 121,
                room: '东楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
              {
                id: 122,
                room: '西楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
            ],
            corridor: [
              {
                id: 121,
                room: '走廊1',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 122,
                room: '走廊2',
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 123,
                room: '走廊3',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
            rooms: [
              {
                id: 101,
                room: 101,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 102,
                room: 102,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 103,
                room: 103,
                smokeStatus: 3,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 104,
                room: 104,
                smokeStatus: 2,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 105,
                room: 105,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 106,
                room: 106,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 107,
                room: 107,
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 108,
                room: 108,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 109,
                room: 109,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 110,
                room: 110,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 111,
                room: 111,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 112,
                room: 112,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 113,
                room: 113,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 114,
                room: 114,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 115,
                room: 115,
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 116,
                room: 116,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 117,
                room: 117,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 118,
                room: 118,
                smokeStatus: 2,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 119,
                room: 119,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 120,
                room: 120,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
          },
        ],
      },
      {
        name: "本科生楼",
        floor: [
          {
            build: '本科生楼',
            floorName: "1F",
            smokeStatus: [3, 2, 1],
            staircase: [
              {
                id: 121,
                room: '东楼梯口',
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 1
              },
              {
                id: 122,
                room: '西楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
            ],
            corridor: [
              {
                id: 121,
                room: '走廊1',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 122,
                room: '走廊2',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 123,
                room: '走廊3',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
            rooms: [
              {
                id: 101,
                room: 101,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 102,
                room: 102,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 103,
                room: 103,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 104,
                room: 104,
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 105,
                room: 105,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 106,
                room: 106,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 107,
                room: 107,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 108,
                room: 108,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 109,
                room: 109,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 110,
                room: 110,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 111,
                room: 111,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 112,
                room: 112,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 113,
                room: 113,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 114,
                room: 114,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 115,
                room: 115,
                smokeStatus: 1,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 116,
                room: 116,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 117,
                room: 117,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 118,
                room: 118,
                smokeStatus: 2,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 119,
                room: 119,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 120,
                room: 120,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
          },
        ],
      },
      {
        name: "教师楼",
        floor: [
          {
            build: '教师楼',
            floorName: "1F",
            smokeStatus: [1],
            staircase: [
              {
                id: 121,
                room: '东楼梯口',
                smokeStatus: 2,
                time: "2022-4-2",
                deviceType: 1
              },
              {
                id: 122,
                room: '西楼梯口',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 1
              },
            ],
            corridor: [
              {
                id: 121,
                room: '走廊1',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 122,
                room: '走廊2',
                smokeStatus: 3,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 123,
                room: '走廊3',
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
            rooms: [
              {
                id: 101,
                room: 101,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 102,
                room: 102,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 103,
                room: 103,
                smokeStatus: 3,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 104,
                room: 104,
                smokeStatus: 2,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 105,
                room: 105,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 106,
                room: 106,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 107,
                room: 107,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 108,
                room: 108,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 109,
                room: 109,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 110,
                room: 110,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 111,
                room: 111,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 112,
                room: 112,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 113,
                room: 113,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 114,
                room: 114,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 115,
                room: 115,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 116,
                room: 116,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 117,
                room: 117,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 118,
                room: 118,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 119,
                room: 119,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
              {
                id: 120,
                room: 120,
                smokeStatus: 0,
                time: "2022-4-2",
                deviceType: 0
              },
            ],
          },
        ],
      },
    ],
    build: {},
    buildTableList: [],
    clickEventAndKeyboardEventCount: 0,
    baiduVoiceList: []
  },
  mutations: {
    GET_BUILD(state, buildConfig) {
      state.buildingList.forEach((builds, index) => {
        if (builds.name === buildConfig.buildName) {
          state.build = state.buildingList[index].floor[buildConfig.floorIndex]
        }
      });
    },
    SET_BUILD_TABLE_LIST(state, buildTableList) {
      state.buildTableList = buildTableList
    },
    SET_CLICK_EVENT_AND_KEYBOARD_EVENT_COUNT(state, count) {
      state.clickEventAndKeyboardEventCount = count
    },
    SET_BAIDU_VOICE_LIST(state, baiduVoiceList) {
      state.baiduVoiceList.push(baiduVoiceList)
    }
  },
  actions: {
    getBuild(context, buildConfig) {
      context.commit('GET_BUILD', buildConfig)
    },
    setBuildTableList(context, buildTableList) {
      context.commit('SET_BUILD_TABLE_LIST', buildTableList);
    },
    setClickEventAndKeyboardEventCount(context, count) {
      context.commit('SET_CLICK_EVENT_AND_KEYBOARD_EVENT_COUNT', count)
    },
    setBaiduVoiceList(context, baiduVoiceText) {
      let baiduVoiceList = {
        src: "",
        size: "",
      }
      baiduVoiceAxios(baiduVoiceText).then((res) => {
        baiduVoiceList.src = res[0].src;
        baiduVoiceList.size = res[0].size;
        context.commit("SET_BAIDU_VOICE_LIST", baiduVoiceList)
      });
    }
  },
  getters: {

  }
}

const floorStore = {
  namespaced: true,//开启命名空间
  state: {},
  mutations: {},
  actions: {}
}

export default new Vuex.Store({
  modules: {
    buildingStore,
    floorStore
  }
})