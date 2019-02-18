module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  const { router, controller } = app;
  router.get('/admin/login', gzip ,controller.admin.login.index);
};