// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  clients: {
    // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
    db1: {
      // 用户名
      user: 'root',
      // 密码
      password: '188208',
      // 数据库名
      database: 'admin-pap',
    },
    db2: {
      // 用户名
      user: 'root',
      // 密码
      password: '188208',
      // 数据库名
      database: 'web-pap',
    },
    // ...
  },
  // 所有数据库配置的默认值
  default: {
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
  },

  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};