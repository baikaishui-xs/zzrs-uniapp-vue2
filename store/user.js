export default {
  // 开启命名空间
  namespaced: true,

  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
  }),
  
  mutations: {
    setToken(state, token) {
      state.token = token
      uni.setStorageSync('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync('userInfo', JSON.stringify(userInfo)) // 将 json 对象转换为字符串
    }
  },
}
