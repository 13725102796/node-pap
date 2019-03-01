import COS from 'cos-js-sdk-v5'
import {
  getSerceKey
} from '@/services/api';

const routeName = 'admin-pap/img/'
export function upload(file,actName) {
  var cos = new COS({
    getAuthorization: function (options, callback) {
      // 异步获取签名
      getSerceKey({
        expirys: 60 * 60
      }).then(res => {
        console.log(res.result)
        const data = res.result
        callback({
          TmpSecretId: data.credentials && data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
          XCosSecurityToken: data.credentials && data.credentials.sessionToken,
          ExpiredTime: data.expiredTime,
        })
      })
    }
  });
  
  const randomArr = Math.floor(Math.random() * 10000)
  const fileName = routeName + randomArr + new Date().getTime() + file.name
  // var cos = new COS({
  //   SecretId: 'AKIDgQPgiWodMp33wZQyb5IYhKiqCJFDdAmp',
  //   SecretKey: 'ycy8L1RM8e06TaSMXP7ZsG3X1tslTgjg',
  // })
  return new Promise((resolve,reject) => {
    cos.putObject({
      Bucket: 'zyc-1258676507',
      Region: 'ap-guangzhou',
      Key: fileName,
      StorageClass: 'STANDARD',
      Body: file, // 上传文件对象
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      }
    }, function (err, data) {
      // console.log(err || data);
      if(err){
        alert('上传失败！')
        return reject(err)
      }  
      return resolve('https://' + data.Location)
    });
  })

  
}

export function delFile(fileUrl) {
  var cos = new COS({
    SecretId: 'AKIDgQPgiWodMp33wZQyb5IYhKiqCJFDdAmp',
    SecretKey: 'ycy8L1RM8e06TaSMXP7ZsG3X1tslTgjg',
  })
  // var cos = new COS({
  //   getAuthorization: function (options, callback) {
  //     // 异步获取签名
  //     getSerceKey({
  //       expirys: 60 * 60
  //     }).then(res => {
  //       console.log(res.result)
  //       const data = res.result
  //       callback({
  //         TmpSecretId: data.credentials && data.credentials.tmpSecretId,
  //         TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
  //         XCosSecurityToken: data.credentials && data.credentials.sessionToken,
  //         ExpiredTime: data.expiredTime,
  //       })
  //     })
  //   }
  // });
  const fileName = fileUrl.split('.com/')[1]
  console.log(fileName)
  return new Promise((resolve,reject) => {
    cos.deleteObject({
      Bucket: 'zyc-1258676507',
      Region: 'ap-guangzhou',
      Key: fileName,
    }, function (err, data) {
      // console.log(err || data);
      if(err){
        alert('图片删除失败！')
        return reject(err)
      }  
      return resolve()
    });
  })
} 
