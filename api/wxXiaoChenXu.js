// 微信小程序

import request from '@/utils/request.js'

export function login(data) { // 获取 token
  return request.post('/user/wxapp/login', data)
}

export function register(data) { // 注册用户
  return request.post('/user/wxapp/register/complex', data)
}