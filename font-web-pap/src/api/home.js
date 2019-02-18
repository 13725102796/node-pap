import http from './http'

class Home {
  getBackTitle = (params)=> http.get('/home',params)
  // bingIc = params => http.post('http://devicecloud.dianqiukj.com/api/device/deviceAction',params)
}

export default new Home()