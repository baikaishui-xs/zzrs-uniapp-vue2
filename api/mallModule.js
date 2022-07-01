// 商城模块

import request from '@/utils/request.js'

export function getGoodsCategory() { // 获取 商品类别
  return request.get('/shop/goods/category/all')
}

export function getAllGoodsList(data) { // 获取 所有商品列表
  return request.post('/shop/goods/list/v2', data)
}
