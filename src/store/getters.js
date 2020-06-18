const getters = {
  // 侧边栏状态
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  // 用户token等
  token: state => state.user.token,
  id: state => state.user.id,
  mobile: state => state.user.mobile,
  heading: state => state.user.heading,

  // 挂载异步路由
  permission_routes: state => state.permission.routes,

  // 标签栏
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}

export default getters
