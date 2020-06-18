import request from '@/utils/request'

// /user/information 用户信息管理列表
export function getUser(page, limit, searchParams) {
  return request({
    url: `/admin/getUser/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /user/information 修改用户信息按钮
export function getOneUser(id) {
  return request({
    url: '/admin/getOneUser',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/information 信息确认修改按钮
export function updateUser(data) {
  return request({
    url: '/admin/updateUser',
    method: 'put',
    data
  })
}

// /user/address 地址信息管理列表
export function getAddress(page, limit, searchParams) {
  return request({
    url: `/admin/getAddress/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /user/address 查看地址信息按钮
export function getOneAddress(id) {
  return request({
    url: '/admin/getOneAddress',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/adoption 领养申请表管理列表
export function getAdoption(page, limit, searchParams) {
  return request({
    url: `/admin/getAdoption/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /user/adoption 查看领养申请表中的宠物信息按钮
export function getAdoptionPet(id) {
  return request({
    url: '/admin/getAdoptionPet',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/adoption 查看领养申请表中的用户信息按钮
export function getAdoptionUser(id) {
  return request({
    url: '/admin/getAdoptionUser',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/adoption 修改用户订单按钮
export function getOneAdoption(id) {
  return request({
    url: '/admin/getOneAdoption',
    method: 'get',
    params: {
      id
    }
  })
}

