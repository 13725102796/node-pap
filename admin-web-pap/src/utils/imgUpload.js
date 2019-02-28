import {
  getSerceKey
} from '@/services/api';
import { importCDN } from '@/utils/utils'
importCDN('https://unpkg.com/cos-js-sdk-v5/demo/common/cos-auth.min.js','CosAuth')
export async function upload(file) {
  const {
    result
  } = await getSerceKey({
    expirys: 60 * 60 
  })
  console.log(result,'651321321')
  const AuthData = {
    XCosSecurityToken: result.credentials.sessionToken,
    Authorization: CosAuth({
      SecretId: result.credentials.tmpSecretId,
      SecretKey: result.credentials.tmpSecretKey,
      Method: 'POST',
      Pathname: '/',
    })
  }
  console.log(file)
  // 请求用到的参数
  var Bucket = 'zyc-1258676507';
  var Region = 'ap-guangzhou';
  var protocol = location.protocol === 'https:' ? 'https:' : 'http:';
  var prefix = protocol + '//' + Bucket + '.cos.' + Region + '.myqcloud.com/';
  const form = new FormData()
  const randomArr = Math.floor(Math.random() * 10000)
  const fileName = randomArr + new Date().getTime() + file.name
  // form.append('key', fileName)
  form.append('key', '/' + fileName)
  form.append('success_action_status', 200)
  
  // form.append('success_action_redirect', 'http://localhost:8000/testPage/test')
  
  form.append('Signature', AuthData.Authorization)
  form.append('x-cos-security-token', AuthData.XCosSecurityToken || '')
  form.append('file', file.originFileObj)

  var xhr = new XMLHttpRequest();
  xhr.open('POST', prefix);
  // xhr.setRequestHeader("Content-Type", "multipart/form-data");
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
      console.log(xhr.responseText);
      return 'success'
    }
  };
  //form表单的默认值为①，而FormData的默认值为multipart/form-data,所以不用画蛇添足的去修改请求头  
  //xhr.setRequestHeader('Content-Type', 'multipart/form-data');
  xhr.send(form);

}
