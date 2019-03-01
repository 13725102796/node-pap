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
  async show(){
    const {
      ctx
    } = this;
    const { list }  = await ctx.service.admin.test.show(ctx.params.id);

    ctx.body = {
      status: 'ok',
      result: list,
    }
  }
  async create(){
    const {
      ctx
    } = this;
    console.log(ctx.request.body)
    const bool  = await ctx.service.admin.test.create(ctx.request.body);
    let status = bool ? 'ok' : 'error'
    let msg = bool ? '操作成功' : '操作失败'
    ctx.body = {
      status: status,
      msg: msg,
      result: bool
    }
  }
  async update(){
    const { ctx } = this;
    const option = { ...ctx.request.body, id: ctx.params.id }
    const bool  = await ctx.service.admin.test.update(option);
    ctx.body = {
      status: bool ? 'ok' : 'error',
      msg: bool ? '更新成功' : '更新失败'
    }
  }
  async destroy(){
    const { ctx } = this;
    const bool = await ctx.service.admin.test.destroy(ctx.params.id);   
    ctx.body = {
      status: bool ? 'ok' : 'error',
      msg: bool ? '删除成功' : '删除失败'
    }
  }
}
module.exports = TestController;

