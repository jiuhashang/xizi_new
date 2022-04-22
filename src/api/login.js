import request from '../utils/request'

export function login (data, callback) {
  return request({
    url: '/admin/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}

// 项目列表
export function getImg(params) {
  return request({
    url: '/admin/captcha',
    method: 'get',
    params
  })
}
