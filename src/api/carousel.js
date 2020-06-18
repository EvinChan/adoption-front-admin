import request from '@/utils/request'

// /carousel/carouselList 轮播图列表
export function getCarousel(page, limit, searchParams) {
  return request({
    url: `/admin/getCarousel/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /carousel/carouselList 修改按钮
export function getOneCarousel(id) {
  return request({
    url: '/admin/getOneCarousel',
    method: 'get',
    params: {
      id
    }
  })
}

// /carousel/carouselList 确认修改按钮
export function updateCarousel(data) {
  return request({
    url: '/admin/updateCarousel',
    method: 'put',
    data
  })
}
