import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import isObject from 'lodash/isObject'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://10.11.32.54:7800',
  // baseURL: '/xizi-api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Req-Origin': 'web'
  },
  transformRequest: [function (data, header) {
    if (header && isObject(data)) {
      const ct = (header['Content-Type'] || '').toLowerCase()
      // form 数据格式转换
      if (ct.indexOf('application/x-www-form-urlencoded') !== -1) {
        let src = ''
        for (const item in data) {
          src += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&'
        }
        return src.replace(/&$/, '')
      }

      // json 格式
      if (ct.indexOf('application/json') !== -1) {
        return JSON.stringify(data)
      }
    }

    return data
  }],
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})
service.interceptors.request.use(
  config => {
    NProgress.start()
    // do something before request is sent
    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['token'] = window.sessionStorage.getItem('token')
    // }
    return config
  },
  error => { // do something with request error // console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    NProgress.done()
    const res = response.data // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code === 401 && !(/admin\/seAdminUser\/getUserInfo$/.test(response?.config?.url))) { // 非获取用户信息接口
        // to re-login
        MessageBox.confirm('当前登录信息已失效，是否前往登录页？', '登陆确认', {
          confirmButtonText: '去登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
            // location.reload()
            
          window.sessionStorage.clear()
          this.$router.push({ name: '/login' })
          // })
        }).catch( err => {
          console.log(err)
        })
      } else {
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000,
          customClass: 'z-index-4000'
        })
      }
      // return Promise.reject(new Error(res.msg || 'Error'))
      return Promise.reject(res.msg || 'Error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg || error?.response?.data?.error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
