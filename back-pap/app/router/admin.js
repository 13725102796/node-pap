module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  const { router, controller } = app;
  router.post('/admin/api/login/account', gzip ,controller.admin.login.index);
  

  router.get('/admin/api/getSecret', gzip ,controller.admin.getsecret.index)
  

  // restful 规范 crud
  router.resources('test', '/admin/api/test', controller.admin.test)

  // 路由控制
  router.resources('routeControll', '/admin/api/routeControll', gzip ,controller.admin.routeControll)
};