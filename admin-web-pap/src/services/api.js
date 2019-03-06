import {
  stringify
} from 'qs';
import request from '@/utils/request';
const fontUrl = 'http://127.0.0.1:7001/admin'

export async function routeApi(act,params){
  if (act === 'update') {
    return request(`${fontUrl}/api/routeControll/${params.id}`, {
      method: 'PUT',
      body: params,
    })
  }
}
export async function testApi(act, params) {
  // console.log(params)
  // console.log(stringify(params))
  if (act === 'index') return request(`${fontUrl}/api/test?${stringify(params)}`)
  if (act === 'show') return request(`${fontUrl}/api/test/${params.id}`)
  if (act === 'create') {
    return request(`${fontUrl}/api/test`, {
      method: 'POST',
      body: params,
    })
  }
  if (act === 'update') {
    return request(`${fontUrl}/api/test/${params.id}`, {
      method: 'PUT',
      body: params,
    })
  }
  if(act === 'del'){
    return request(`${fontUrl}/api/test/${params.id}`, {
      method: 'DELETE',
      // body: params,
    })
  }
}

export async function getSerceKey(params){
  // 先看看有没有session存在
  return request(`${fontUrl}/api/getSecret?${stringify(params)}`,{expirys: params.expirys || ''})
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const {
    count = 5, ...restParams
  } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const {
    count = 5, ...restParams
  } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const {
    count = 5, ...restParams
  } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request(fontUrl + '/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
