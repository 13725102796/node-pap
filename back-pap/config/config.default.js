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
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080'], //配置白名单
  };

  config.cors = {
    
    origin: '*', //允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };


  return {
    ...config,
    ...userConfig,
  };
};