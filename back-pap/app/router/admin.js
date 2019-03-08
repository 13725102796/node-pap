module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  const checkToken = app.middleware.checkToken();
  const { router, controller } = app;
  router.post('/admin/api/login/account', gzip ,controller.admin.login.index);
  

  router.get('/admin/api/getSecret', gzip,checkToken ,controller.admin.getsecret.index)
  

  // restful 规范 crud
  router.resources('test', '/admin/api/test', checkToken, controller.admin.test)

  // 路由控制
  router.resources('routeControll', '/admin/api/routeControll', gzip ,checkToken,controller.admin.routeControll)
};