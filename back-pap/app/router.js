'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  const { router, controller } = app;
  // const url = app.originalUrl

  console.log(app)
  

  // router.get('/', controller.home.index);
  router.get('/home', gzip, controller.home.index)
  require('./router/admin')(app)
  require('./router/web')(app)
};