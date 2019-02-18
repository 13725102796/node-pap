import cookies from '@/util/cookie'

const mid = localStorage.getItem('mid') || cookies.getItem('mid')
const is_test = false
// const config = require('../config')
const testApi = is_test ? 'http://api.xzysoft.net': 'http://127.0.0.1:7001'
// aliyun resource
var fileHost = 'http://xzysaas.oss-cn-shenzhen.aliyuncs.com'
export default {
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  AccessKeySecret: 'R3aPVSVEBbJXiE0ParCQf9foGPLbm8',
  OSSAccessKeyId: 'LTAIrewlzXbuN7a9',
  imgPolicy: 'eyJleHBpcmF0aW9uIjoiMjA1MC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMjA5NzE1Ml1dfQ==',
  imgSignature: 'g1+MVqStG0CFvWtgGalY5m2f5gg=',

  getImg: 'http://resource.xzysoft.net',
  // config
  getUrl: testApi,
  // wx 授权
  wxUrl: `${testApi}/wechat/api/wechat/auth/mid/${mid}`,
  wxUrlLess: `${testApi}/wechat/api/wechat/auth/mid/` 
}