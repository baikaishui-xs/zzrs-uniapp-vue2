// 商城模块

import request from '@/utils/request.js'

export function getGoodsCategory() { // 获取 商品类别
  return request.get('/shop/goods/category/all')
}

export function getAllGoodsList(data) { // 获取 商品列表
  return request.post('/shop/goods/list/v2', data)
}

export function getGoodsInfo(ID) { // 获取 商品信息
  return request.get('/shop/goods/detail?id=' + ID)
}