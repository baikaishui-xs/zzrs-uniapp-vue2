import { getShopCartInfo } from '@/api/mallModule.js'

export default {
  // 开启命名空间
  namespaced: true,

  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    shopCartInfo: JSON.parse(uni.getStorageSync('shopCartInfo') || 0), // 购物车中信息
  }),
  
  mutations: {
    setToken(state, token) {
      state.token = token
      uni.setStorageSync('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync('userInfo', JSON.stringify(userInfo)) // 将 json 对象转换为字符串
    },
    setShopCartInfo(state, shopCartInfo) {
      state.shopCartInfo = shopCartInfo
      uni.setStorageSync('shopCartInfo', JSON.stringify(shopCartInfo)) // 将 json 对象转换为字符串
    },
  },
  
  actions: {
    async getShopCartInfo(context) { // 获取 购物车信息
      const result = await getShopCartInfo()
      context.commit('setShopCartInfo', result.data.data)
    }
  }
}
