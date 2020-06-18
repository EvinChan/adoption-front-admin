import request from '@/utils/request'

// /organization/list 机构信息管理列表
export function getOrganization(page, limit, searchParams) {
  return request({
    url: `/admin/getOrganization/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /organization/list 查看机构信息按钮
export function getOneOrganization(id) {
  return request({
    url: '/admin/getOneOrganization',
    method: 'get',
    params: {
      id
    }
  })
}

// /organization/list 确认修改 按钮
export function updateOrganizationInfo(data) {
  return request({
    url: '/admin/updateOrganizationInfo',
    method: 'put',
    data
  })
}

// /organization/list 审核失败/审核通过 按钮
export function updateOrganization(id, status) {
  return request({
    url: '/admin/updateOrganization',
    method: 'put',
    data: {
      id,
      status
    }
  })
}
