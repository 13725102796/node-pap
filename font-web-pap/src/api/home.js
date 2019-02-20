import http from './http'

class Home {
  getBackTitle = (params)=> http.get('/home',params)
  login = params=>http.post('/admin/api/login/account',params)
  // bingIc = params => http.post('http://devicecloud.dianqiukj.com/api/device/deviceAction',params)
}

export default new Home()