import request from '@/utils/request'

// 管理员登录
export function login(data) {
  return request({
    url:'/admin/login',
    method: "post",
    data
  })
}

// 根据token获取管理员信息
export function getData() {
  return request({
    url: '/admin/getData',
    method: 'get',
  })
}

// 分类选择器
export function getClassificationList() {
  return request({
    url: '/admin/getClassificationList',
    method: 'get'
  })
}

// 根据分类id品种选择器
export function getCategoryList(id) {
  return request({
    url: '/admin/getCategoryList',
    method: 'get',
    params: {
      id
    }
  })
}

// 根据分类name品种选择器
export function getCategoryList2(id) {
  return request({
    url: '/admin/getCategoryList2',
    method: 'get',
    params: {
      id
    }
  })
}

// 省份选择器
export function getProvinceList() {
  return request({
    url: '/admin/getProvinceList',
    method: 'get'
  })
}

// name 市选择器
export function getCityList(name) {
  return request({
    url: '/admin/getCityList',
    method: 'get',
    params: {
      name
    }
  })
}

// 机构选择器
export function getOrganizationList() {
  return request({
    url: '/admin/getOrganizationList',
    method: 'get'
  })
}
