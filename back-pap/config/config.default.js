/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    // add your middleware config here
    middleware: ['gzip'],
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550453563025_8140';



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //跨域配置
  config.cors = {
    // origin: 'http://localhost:8000',
    credentials:true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.security = {
    csrf: {
      // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      // enable: false,
      ignore:ctx=>{
        const domainWhiteList = ctx.app.config.security.domainWhiteList
        return domainWhiteList.indexOf(ctx.request.headers.origin) != -1
      }
      // ignoreJSON: true
    },
    // credentials:true,
    domainWhiteList: ['http://localhost:8000','http://localhost:8080','http://192.168.0.192:8080','http://192.168.0.192:8000']
  };



  return {
    ...config,
    ...userConfig,
  };
};