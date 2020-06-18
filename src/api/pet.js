import request from '@/utils/request'

// /pet/classification 宠物分类管理列表
export function getClassification(page, limit, searchParams) {
  return request({
    url: `/admin/getClassification/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /pet/classification 修改按钮
export function getOneClassification(id) {
  return request({
    url: '/admin/getOneClassification',
    method: 'get',
    params: {
      id
    }
  })
}

// /pet/classification 确认修改按钮
export function updateClassification(data) {
  return request({
    url: '/admin/updateClassification',
    method: 'put',
    data
  })
}

// /pet/classification 新增分类按钮
export function createClassification(data) {
  return request({
    url: '/admin/createClassification',
    method: 'post',
    data
  })
}

// /pet/category 宠物品种管理列表
export function getCategory(page, limit, searchParams) {
  return request({
    url: `/admin/getCategory/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /pet/category 修改按钮
export function getOneCategory(id) {
  return request({
    url: '/admin/getOneCategory',
    method: 'get',
    params: {
      id
    }
  })
}

// /pet/category 确认修改按钮
export function updateCategory(data) {
  return request({
    url: '/admin/updateCategory',
    method: 'put',
    data
  })
}

// /pet/category 新增品种按钮
export function createCategory(data) {
  return request({
    url: '/admin/createCategory',
    method: 'post',
    data
  })
}

// /pet/information 宠物信息管理列表
export function getPet(page, limit, searchParams) {
  return request({
    url: `/admin/getPet/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /pet/information 修改基础信息按钮
export function getOnePet(id) {
  return request({
    url: '/admin/getOnePet',
    method: 'get',
    params: {
      id
    }
  })
}

// /pet/information 基础信息确认修改按钮
export function updatePet(data) {
  return request({
    url: '/admin/updatePet',
    method: 'put',
    data
  })
}

// /pet/information 修改详细信息按钮
export function getOnePetInformation(id) {
  return request({
    url: '/admin/getOnePetInformation',
    method: 'get',
    params: {
      id
    }
  })
}

// /pet/information 详细信息确认修改按钮
export function updatePetInformation(data) {
  return request({
    url: '/admin/updatePetInformation',
    method: 'put',
    data
  })
}

