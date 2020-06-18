// 封装axios
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

//请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['ADMIN-Token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  //请求成功
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || '网络链接错误！请检查网络配置！',
        type: 'error',
        duration: 3 * 1000
      });
    }
    return res;
  },
  //请求失败
  error => {
    if (error.response && error.response.status === 401){
      Message({
        message: '用户验证失败，请重新登录！',
        type: 'error',
        duration: 3 * 1000
      })
      //删除过期token
      store.dispatch('user/logout')
      //跳转至登录页
      router.push({path: '/login'})
      return Promise.reject(error)
    }
    else {
      Message({
        message: '网络链接错误！请检查网络配置！',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
