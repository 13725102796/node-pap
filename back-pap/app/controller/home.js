'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const query = ctx.query
    const title = await this.getTitle(query.id)
    console.log(query)
    ctx.body = {
      err_code: 10000,
      // msg: 'success',
      result: title
    }
    

  }

  async getTitle(id){
    const titleArr = ['asdfas','asdfasdf','hi egg!']
    return titleArr[id] || 'no title'
  }
}

module.exports = HomeController;