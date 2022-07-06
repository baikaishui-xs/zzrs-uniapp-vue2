// 商城模块

import request from '@/utils/request.js'
import store from '@/store/store.js'

export function getGoodsCategory() { // 获取 商品类别
  return request.get('/shop/goods/category/all')
}

export function getAllGoodsList(data) { // 获取 商品列表
  return request.post('/shop/goods/list/v2', data)
}

export function getGoodsInfo(ID) { // 获取 商品信息
  return request.get('/shop/goods/detail?id=' + ID)
}

export function getShopCartInfo() { // 获取 购物车商品信息
  return request.get(`/shopping-cart/info?token=${store.state.user.token}`)
}

export function addShopCart(data) { // 加入购物车
  return request.post('/shopping-cart/add', data)
}

export function delShopCartGoods(params) { // 删除购物车商品
  return request.post('/shopping-cart/remove', params)
}

export function modifySelected(data) { // 修改 购物车选中状态
  return request.post('/shopping-cart/select', data)
}

export function modifyNumber(data) { // 购物车修改购买数量
  return request.post('/shopping-cart/modifyNumber', data)
}