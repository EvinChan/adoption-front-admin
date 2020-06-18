import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '系统首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userInformation',
    meta: { title: '用户管理', icon: 'peoples' },
    children: [
      {
        path: 'userInformation',
        name: 'userInformation',
        component: () => import('@/views/user/information'),
        meta: { title: '用户信息列表' }
      },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/user/address'),
        meta: { title: '用户地址列表' }
      },
      {
        path: 'adoption',
        name: 'adoption',
        component: () => import('@/views/user/adoption'),
        meta: { title: '用户领养申请表' }
      }
    ]
  },
  {
    path: '/organization',
    alwaysShow: true,
    component: Layout,
    redirect: '/organization/organizationList',
    meta: { title: '机构管理', icon: 'user' },
    children: [
      {
        path: 'organizationList',
        name: 'organizationList',
        component: () => import('@/views/organization/index'),
        meta: { title: '机构列表' }
      }
    ]
  },
  {
    path: '/pet',
    component: Layout,
    redirect: '/pet/classification',
    meta: { title: '宠物管理', icon: 'list' },
    children: [
      {
        path: 'classification',
        name: 'classification',
        component: () => import('@/views/pet/classification'),
        meta: { title: '宠物分类管理' }
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/pet/category'),
        meta: { title: '宠物品种管理' }
      },
      {
        path: 'petInformation',
        name: 'petInformation',
        component: () => import('@/views/pet/information'),
        meta: { title: '宠物信息管理' }
      }
    ]
  },
  {
    path: '/order',
    alwaysShow: true,
    component: Layout,
    redirect: '/order/orderList',
    meta: { title: '订单管理', icon: 'form' },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/order/index'),
        meta: { title: '订单列表' }
      }
    ]
  },
  {
    path: '/carousel',
    alwaysShow: true,
    component: Layout,
    redirect: '/carousel/carouselList',
    meta: { title: '首页管理', icon: 'theme' },
    children: [
      {
        path: 'carouselList',
        name: 'carouselList',
        component: () => import('@/views/carousel/index'),
        meta: { title: '轮播图列表' }
      }
    ]
  },
  {
    path: '/notice',
    alwaysShow: true,
    component: Layout,
    redirect: '/notice/noticeList',
    meta: { title: '公告管理', icon: 'edit' },
    children: [
      {
        path: 'noticeList',
        name: 'noticeList',
        component: () => import('@/views/notice/index'),
        meta: { title: '公告列表' }
      }
    ]
  },
  {
    path: '/statement',
    alwaysShow: true,
    component: Layout,
    redirect: '/order/orderList',
    meta: { title: '数据报表', icon: 'chart' },
    children: [
      {
        path: 'statement',
        name: 'statement',
        component: () => import('@/views/statement/index'),
        meta: { title: '报表查看' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
