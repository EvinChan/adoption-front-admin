import request from '@/utils/request'

// 首页dashboard
export function getDashBoard() {
  return request({
    url: '/adminChart/getDashBoard',
    method: 'get'
  })
}

// 首页chart
export function getChart() {
  return request({
    url: '/adminChart/getDashBoardChart',
    method: 'get'
  })
}

// 数据报表 查询某月新增宠物数量
export function getStatementChart1(value1) {
  return request({
    url: '/adminChart/getStatementChart1',
    method: 'get',
    params: {
      value1
    }
  })
}

// 数据报表 查询某月订单数量
export function getStatementChart2(value2) {
  return request({
    url: '/adminChart/getStatementChart2',
    method: 'get',
    params: {
      value2
    }
  })
}
