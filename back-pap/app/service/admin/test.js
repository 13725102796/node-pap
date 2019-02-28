const Service = require('egg').Service;

const dbName = 'testlist'
class LoginService extends Service {
  client1(){ return this.app.mysql.get('db1')}
  // SELECT SQL_CALC_FOUND_ROWS goods WHERE k='avs' LIMIT 10; 
  // SELECT FOUND_ROWS();
  async index(option) {
    const list = await this.client1().select(dbName, {
      where: option.select || { },
      orders: [['created_at','desc'], ['id','desc']],
      limit: option.limit || 10,
      offset: option.offset || 0
    })
    // SELECT count(*) FROM (SELECT COUNT(*) FROM `${dbName}` WHERE `c_time`>=1474560000 and `c_time`<1476201600 group by `record_type`) 
    const totalPage = await this.getTotal(option)
    return {list,totalPage}

  }
  async show(id){
    const list = await this.client1().get(dbName, {id: id})
    
    return {list}
  }

  async create(option){
    const created_at = Math.floor(new Date().getTime() / 1000)
    const result = await this.client1().insert(dbName, { ...option, created_at: created_at  })
    const insertSuccess = result.affectedRows === 1
    // console.log(result)
    // console.log(insertSuccess)
    return insertSuccess ? result.insertId : false
  }

  async update(option){
    const update_at = Math.floor(new Date().getTime() / 1000)
    const result = await this.client1().update(dbName, {...option, update_at: update_at });
    return result.affectedRows === 1;
  }

  async destroy(id){
    const result = await this.client1().delete(dbName, {
      id: id
    })
    return result.affectedRows === 1;
  }

  async getTotal(option){
    const totalPage = await this.client1().count(dbName,{
      ...option.select
    })
    return totalPage
    // console.log(totalPage)
  }
}

module.exports = LoginService