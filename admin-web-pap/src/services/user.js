import request from '@/utils/request';
const fontUrl = 'http://127.0.0.1:7001/admin'
export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  // return request(fontUrl + '/api/routeControll')
  return request('/api/currentUser');
}
