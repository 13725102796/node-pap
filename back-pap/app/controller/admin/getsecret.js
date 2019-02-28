'use strict';

const Controller = require('egg').Controller;
const STS = require('qcloud-cos-sts');
var config = {
  secretId: 'AKIDzRefaYsGAMO9fyyKFEOcZe9fx08PhKuj',
  secretKey: '1SiceU3OJ0eAG6SVJkCgvvjT8XdtHxGe',
  proxy: '',
  durationSeconds: 1800,
  bucket: 'zyc-1258676507',
  region: 'ap-guangzhou',
  allowPrefix: '*',
  // 密钥的权限列表
  allowActions: [
    // 所有 action 请看文档 https://cloud.tencent.com/document/product/436/31923
    // 简单上传
    'name/cos:PutObject',
    // 分片上传
    'name/cos:InitiateMultipartUpload',
    'name/cos:ListMultipartUploads',
    'name/cos:ListParts',
    'name/cos:UploadPart',
    'name/cos:CompleteMultipartUpload'
  ],
};

class GetsecretController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    console.log(ctx.query)
    if(ctx.query.expirys) config.durationSeconds = ctx.query.expirys
    // TODO 这里根据自己业务需要做好放行判断
    // if (config.allowPrefix !== 'admin-pap/*') {
    //   ctx.body = {
    //     error: '请修改 allowPrefix 配置项，指定允许上传的路径前缀'
    //   };
    //   return;
    // }
    // 获取临时密钥
    const key = await this.getSecretKey()
    ctx.body = {
      status: 'ok',
      result: key
    }


  }
  async getSecretKey() {
    const that = this
    var LongBucketName = config.bucket;
    var ShortBucketName = LongBucketName.substr(0, LongBucketName.indexOf('-'));
    var AppId = LongBucketName.substr(LongBucketName.indexOf('-') + 1);
    var policy = {
      'version': '2.0',
      'statement': [{
        'action': config.allowActions,
        'effect': 'allow',
        'principal': {
          'qcs': ['*']
        },
        'resource': [
          'qcs::cos:ap-guangzhou:uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/' + config.allowPrefix,
        ],
      }],
    };
    console.log('qcs::cos:ap-guangzhou:uid/' + AppId + ':prefix//' + AppId + '/' + ShortBucketName + '/' + config.allowPrefix,)
    var startTime = Math.round(Date.now() / 1000);
    return new Promise((resolve,reject)=>{
      try{
        STS.getCredential({
          secretId: config.secretId,
          secretKey: config.secretKey,
          proxy: config.proxy,
          durationSeconds: config.durationSeconds,
          policy: policy,
        }, function (err, tempKeys) {
          var result = JSON.stringify(err || tempKeys) || '';
          // that.ctx.body = {
          //   result: result
          // }
          resolve(result)
          // res.send(result);
        });
      } catch (err){
        reject(err)
      }
      
    }).then(res=>{
      // console.log(res,213321)
      return JSON.parse(res)
    })
    

  }
}

module.exports = GetsecretController;