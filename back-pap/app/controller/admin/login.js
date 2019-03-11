'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken')
class LoginController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    console.log(ctx.request.body)
    const {user}  = await ctx.service.admin.login.find(ctx.request.body);
    // let code = 'ok'
    // let msg = '操作成功'
    const body = {
      status: 'ok',
      msg: '操作成功',
      // currentAuthority: 'admin',
      type: ctx.request.body.type,
      result: user,
    }
    // console.log(user.password)

    if(!user || user.password !== ctx.request.body.password) {
      body.status = 'error'
      body.msg = '用户名或密码出错'
    } else {
      let token = jwt.sign({
        user_id: user.id,
      }, 'shhhhh', {
        expiresIn: '10h' //时间根据自己定，具体可参考jsonwebtoken插件官方说明
      })
      // ctx.cookies.set('token', token, {maxAge: 60*1000,httpOnly:false,overwrite:true,signed:false})
      body.token = token
    }

    ctx.body = body
  }
}

module.exports = LoginController;