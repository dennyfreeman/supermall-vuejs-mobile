import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

//1、安装插件
Vue.use(Vuex)

//创建并挂在store对象
export default new Vuex.Store({
  state: {
    cartList: []
  },

  // 2、最简单而且是比较靠后的操作，就直接放到mutations中操作中，比如直接修改state数组
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的时间比较单一一点
  mutations,

  // 1、在VueX最麻烦的步骤和必须要先先做的步骤先放到actions中
  actions,
  modules: {
  },
  getters
})
