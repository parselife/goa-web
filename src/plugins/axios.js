import axios from 'axios'
import {Cookies} from 'quasar'

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8080'
})

export default ({ Vue }) => {
  // something to do
  Vue.prototype.$axios = axiosInstance

  // 注入axios请求和响应的相关拦截器
  axiosInstance.interceptors.request.use(config => {
    // if (token === undefined) {
    //   // 跳转到 登陆页
    //   router.push('/login')
    // } else {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  })

}

export { axiosInstance }
