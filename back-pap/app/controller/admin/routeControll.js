'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index(){
    // console.log(this.ctx)
    const {
      ctx
    } = this;
    const option = ctx.query
    // console.log(ctx.query)
    const { list,totalPage }  = await ctx.service.admin.test.index(option);

    ctx.body = {
      status: 'ok',
      result: list,
      limit: option.limit || 10,
      offset: option.offset || 0,
      totalPage: totalPage
    }
  }
  // async show(){
  //   const {
  //     ctx
  //   } = this;
  //   const { list }  = await ctx.service.admin.test.show(ctx.params.id);

  //   ctx.body = {
  //     status: 'ok',
  //     result: list,
  //   }
  // }
  async update(){
    const { ctx } = this;
    const option = { ...ctx.request.body, id: ctx.params.id }
    const bool  = await ctx.service.admin.routeControll.update(option);
    ctx.body = {
      status: bool ? 'ok' : 'error',
      msg: bool ? '更新成功' : '更新失败'
    }
  }

}
module.exports = TestController;

