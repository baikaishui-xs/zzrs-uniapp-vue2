// 站点设置

import request from '@/utils/request.js'

export function getBanner(params) { // 获取 轮播图
  return request.get('/banner/list', params)
}
