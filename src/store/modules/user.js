import { login, getData } from '@/api/main'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  id: '',
  mobile: '',
  heading: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_HEADING: (state, heading) => {
    state.heading = heading
  }
}

const actions = {
  // 用户登录
  login({ commit }, adminInfo) {
    return new Promise((resolve, reject) => {
      login(adminInfo).then(response => {
        if (response.code === 200){
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
        }
        else {
          reject()
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 根据token获取用户信息
  getData({ commit, state }) {
    return new Promise((resolve, reject) => {
      getData(state.token).then(response => {
        const data = response.data
        if (!data || JSON.stringify(data) === "{}") {
          reject('Token验证失败，请重新登录！')
        }
        const { id, mobile, heading } = data
        commit('SET_ID', id)
        commit('SET_MOBILE', mobile)
        commit('SET_HEADING', heading)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户注销
  logout({ commit, state }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      //resetRouter()
      resolve()
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

