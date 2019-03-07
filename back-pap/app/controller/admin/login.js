'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    console.log(ctx.request.body)
    const {user}  = await ctx.service.admin.login.find(ctx.request.body);
    let code = 'ok'
    let msg = '操作成功'
      
    // console.log(user.password)

    if(!user || user.password !== ctx.request.body.password) {
      code = 'error'
      msg = '用户名或密码出错'
      routeData = ''
    }

    ctx.body = {
      status: code,
      msg: msg,
      currentAuthority: 'admin',
      type: ctx.request.body.type,
      result: user,
    }
  }
}

module.exports = LoginController;