import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations.js";
import actions from "./actions";
import getters from "./getters"
// 1.安装插件
Vue.use(Vuex)

const state = {
   cartList:[]
}

// 创建Store 对象
const store =new Vuex.Store({
   state,
   mutations,
   actions,
   getters
})
  // 挂载到vue 上
export  default  store
