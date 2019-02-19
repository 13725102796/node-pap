module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  const { router, controller } = app;
  router.get('/home', gzip, controller.web.home.index)

};