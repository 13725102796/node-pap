'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const query = ctx.query
    // const title = await this.getTitle(query.id)
    console.log(query)
    ctx.body = {
      err_code: 10000,
      // msg: 'success',
      result: '访问成功'
    }
  }
}

module.exports = HomeController;