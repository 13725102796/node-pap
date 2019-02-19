'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    console.log(ctx.request.body)
    ctx.body = {
      err_code: 10000,
      // msg: 'success',
      result: '访问成功'
    }
  }
}

module.exports = LoginController;