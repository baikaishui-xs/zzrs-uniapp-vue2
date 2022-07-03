// 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 用户的 vuex 模块
import user from './user.js'

// 将 Vue 安装为 Vue 的插件
Vue.use(Vuex)

// 创建 store 实例对象
const store = new Vuex.Store({
  // 挂载 state 中的数据
  modules: {
    user,
  },
})

// 向外共享 store 实例对象
export default store