import {
  $http
} from '@escook/request-miniprogram'

$http.baseUrl = 'https://api.it120.cc/zcr' // 请求根路径

$http.beforeRequest = function(request) { // 请求拦截器
  request.header['content-type'] = 'application/x-www-form-urlencoded',
  uni.showLoading({ // 展示 loading 效果
    title: '数据加载中...'
  })
}

$http.afterRequest = function(response) { // 响应拦截器
  uni.hideLoading() // 隐藏 loading 效果
  if (response.data.msg === 'success' || response.data.status === 0) {
    return response.data.data // 这个插件视乎不能返回数据，虽然这里返回了，但是实际拿到的还是服务器响应的数据。【用过这些方式：给 response 重新赋值】
  }
  if (response.data.code === 2000) {
    // router.push('login')
    // store.commit('user/cancel')
  }
  if (response.data.msg === '暂无数据') {
    return
  }
  Message.error(response.data.msg)
  // 把异步API执行失败的结果传递出去
  return Promise.reject(response.data.msg)
}

uni.$showMsg = function(title = '数据请求失败！', duration = 1500) { // 封装 uni.showToast。作用：简化请求失败处理逻辑
  /* 使用方式
    if (res.meta.status !== 200) return uni.$showMsg() // 请求失败

    uni.$showMsg('数据请求成功！') // 请求成功
  */
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

export default $http
