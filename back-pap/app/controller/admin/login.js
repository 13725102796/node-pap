'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    console.log(ctx.request.body)
    const user = await ctx.service.login.find(ctx.request.body);
    let code = 10000
    let msg = '操作成功'
    if(!user || user.length == 0) {
      code = 10001 
      msg = '用户名或密码出错'
    } 

    ctx.body = {
      err_code: code,
      msg: msg,
      result: user
    }
    
    // ctx.status = 200;
  }
}

module.exports = LoginController;