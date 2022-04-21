import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRoutes, resetRouter,anyRoutes,constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户名
    name: '',
    // 存储用户头像
    avatar: '',
    // 服务器返回的菜单的信息【根据不同的角色 返回的标记信息 数组里面的元素是字符串】
    routes:[],
    // 角色信息
    roles:[],
    // 按钮权限的信息
    buttons:[],
    // 对比之后【项目中已有的异步路由 与服务器返回的标记信息进行对比 最终需要展示的路由】
    resultAsyncRoutes:[],
    // 用户最终需要展示全部路由
    resultAllRoutes:[],
  }
}

const state = getDefaultState()

// 修改state的地方
const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户信息
  SET_USERINFO:(state,userInfo) =>{
    // 用户名
    state.name=userInfo.name
    // 用户头像
    state.avatar = userInfo.avatar
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限的标记
    state.buttons = userInfo.buttons
    // 角色
    state.roles = userInfo.roles
    
  },
  // 最终计算出来的异步路由
  SET_RESULTSYNCROUTES:(state,asyncRoutes)=>{
    // vuex保存当前用户的异步路由 注意 一个用户需要展示完成路由：常量 异步 任意路由
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户需要展示的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 定义一个函数：两个数据进行对比 对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes,routes) =>{
  // 过滤出当前用户 【超级员工|普通员工】需要展示的异步路由
   return asyncRoutes.filter((item)=>{
    // console.log(item,222)
    if(routes.indexOf(item.name)!=-1){
      // 递归 别忘记还有 2 3 4 5级路由  
      if(item.children && item.children.length){
        item.children = computedAsyncRoutes(item.children,routes)
      }
      return true
    }
  })
}


const actions = {
  // user login
  // 这里在处理登录的业务
  async login({ commit }, userInfo) {
    // 结构出用户名与密码
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // 注意：当前登录请求现在使用mock数据 mock数据code是20000
    if(result.code==20000){
      // vuex存储token
      commit("SET_TOKEN",result.data.token)
      // 本地持久化存储token
      setToken(result.data.token)
      return "ok"
    }else{
      return Promise.reject(new Error('faile'))
    }

  },

  // get user info
  // 获取用户信息
  async getInfo({ commit, state }) {

    let result = await getInfo(state.token)
    // console.log(result)
    if(result.code==20000){
      // 返回的信息 包含 name 头像 
      // vue存储用户的全部的信息
      console.log(result.data,111)
      commit('SET_USERINFO',result.data)
      commit('SET_RESULTSYNCROUTES',computedAsyncRoutes(asyncRoutes,result.data.routes))
    

      return "ok"
    }else{
      return Promise.reject(new Error("faile"))
    }
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  async logout({ commit, state }) {
    
    let result = await logout(state.token)
    // console.log(result)
    if(result.code==20000){
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      return "ok"
    }else{
      return Promise.reject(new Error("faile"))
    }

    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
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

