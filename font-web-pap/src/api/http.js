import axios from 'axios'
import qs from 'qs'
import app from '@/main'
import configs from '@/config.js'
import cookies from '@/util/cookie'

//发送一般请求
// console.log(process.env.BASE_API)
axios.defaults.withCredentials = true
const http = axios.create({
  timeout: 10000,
  baseURL: configs.getUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})


const form = axios.create({
  timeout: 60000,
  // baseURL: URL,
  headers: {
    'Content-Type' : 'multipart/form-data'
  }
})

http.interceptors.request.use(config => {
  // console.log(store.getters.token)
  // if (cookies.hasItem('token')) {
  //   config.headers.Authorization = 'bearer' + cookies.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  
  return config
}, err => {
  
  return Promise.reject(error);
})

export default {
  post(url, params = {} ) {
    // console.log(qs.stringify(params))
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.post(url, qs.stringify(params))
        // resolve(data.data)
        const code = Number(data.data.err_code)
        // console.log(code)
        if(code === 10000) {
          resolve(data.data)
        } else if (code === 10001 ) {
          // 重新登陆 清除登陆信息 location.reload()
          // removeToken()
          // console.log(data.data.result)
          // setTimeout(()=>{
          //   // app.$router.push({path: '/login'})  
          //   window.location.href = configs.wxUrl
          // },1500) 
          console.log(data.data.result) 
          reject()
        } else {
          console.log(data.data.result) 
          reject()
        }
      }
      catch (err) {
        if(err.response.status ==  500){
          alert('服务器异常！')
        } else {
          alert('网络异常！')
        } 
        
        console.log(err)
      }
    })
  },
  get(url, params = {},loading=false ) {
    // console.log(qs.stringify(params))
    if(loading) app.$toast.loading()
    return new Promise(async (resolve, reject) => {
      try {
        // const data = await http.get(url, qs.stringify(params))
        const data = await http.get(url + '?' + qs.stringify(params))
        // resolve(data.data)
        const code = Number(data.data.err_code)
        if(loading) app.$toast.clear()
        if(code === 10000) {
    
          resolve(data.data)
        } else if (code === 10001 ) {
          // 重新登陆 清除登陆信息 location.reload()
          // removeToken()
          // console.log(data.data.result)
          // setTimeout(()=>{
          //   // app.$router.push({path: '/login'})  
          //   window.location.href = configs.wxUrl
          // },1500) 
        } else {
          console.log(data.data.result)
          // reject() 
        }

      }
      catch (err) {
        if(err.response.status ==  500){
          alert('服务器异常！')
        } else {
          alert('网络异常！')
        } 
        console.log(err)
      }
    })
  },
  put(url, params = {} ) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.put(url, qs.stringify(params))
        // resolve(data.data)
        const code = Number(data.data.err_code)
        if(code === 10000) {
          resolve(data.data)
        } else if (code === 10001 ) {
          // 重新登陆 清除登陆信息 location.reload()
          // removeToken()
          console.log(data.data.result)
          setTimeout(()=>{
            // app.$router.push({path: '/login'})  
            window.location.href = configs.wxUrl
          },1500) 
        } else {
          console.log(data.data.result)  
          reject()
        }
      }
      catch (err) {
        if(err.response.status ==  500){
          alert('服务器异常！')
        } else {
          alert('网络异常！')
        } 
        console.log(err)
      }
    })
  },
  del(url, params = {} ) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.delete(url + '?' + qs.stringify(params))
        // resolve(data.data)
        const code = Number(data.data.err_code)
        if(code === 10000) {
          resolve(data.data)
        } else if (code === 10001 ) {
          // 重新登陆 清除登陆信息 location.reload()
          // removeToken()
          console.log(data.data.result)
          setTimeout(()=>{
            // app.$router.push({path: '/login'})  
            window.location.href = configs.wxUrl
          },1500) 
        } else {
          console.log(data.data.result) 
          console.log(data)
          // reject() 
        }
      }
      catch (err) {
        if(err.response.status ==  500){
          alert('服务器异常！')
        } else {
          alert('网络异常！')
        } 
        console.log(err)
      }
    })
  },
}