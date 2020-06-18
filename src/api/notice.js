import request from '@/utils/request'

// /notice/notice 公告管理列表
export function getNotice(page, limit, searchParams) {
  return request({
    url: `/admin/getNotice/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /notice/notice 修改公告信息按钮
export function getOneNotice(id) {
  return request({
    url: '/admin/getOneNotice',
    method: 'get',
    params: {
      id
    }
  })
}

// /notice/notice 信息确认修改按钮
export function updateNotice(data) {
  return request({
    url: '/admin/updateNotice',
    method: 'put',
    data
  })
}

// /notice/notice 新增公告按钮
export function createNotice(data) {
  return request({
    url: '/admin/createNotice',
    method: 'post',
    data
  })
}
