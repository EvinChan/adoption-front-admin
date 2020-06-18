import request from '@/utils/request'

// order/orderList 订单信息管理列表
export function getOrder(page, limit, searchParams) {
  return request({
    url: `/admin/getOrder/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// order/orderList 修改用户订单按钮
export function getOneOrder(id) {
  return request({
    url: '/admin/getOneOrder',
    method: 'get',
    params: {
      id
    }
  })
}
