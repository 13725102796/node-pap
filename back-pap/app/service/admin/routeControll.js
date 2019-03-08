const Service = require('egg').Service;

const dbName = 'user'
class LoginService extends Service {
  client1(){ return this.app.mysql.get('db1')}
  // SELECT SQL_CALC_FOUND_ROWS goods WHERE k='avs' LIMIT 10; 
  // SELECT FOUND_ROWS();
  // async index(option) {
  //   // console.log(option)
  //   const limit =  Number(option.limit-1) || ''
  //   const offset = Number(option.offset*limit) || '' 
  //   const list = await this.client1().select(dbName, {
  //     where: option.select || { },
  //     orders: [['id','desc']],
  //     limit: limit,
  //     offset: offset
  //   })
  //   // SELECT count(*) FROM (SELECT COUNT(*) FROM `${dbName}` WHERE `c_time`>=1474560000 and `c_time`<1476201600 group by `record_type`) 
  //   const totalPage = await this.getTotal(option)
  //   return {list,totalPage}

  // }
  async index(id){
    const list = await this.client1().get(dbName, {id: id})
    console.log(id)
    console.log(list)
    return {list}
  }

  async update(option){
    const update_at = Math.floor(new Date().getTime() / 1000)
    const result = await this.client1().update(dbName, {...option, update_at: update_at });
    return result.affectedRows === 1;
  }

}

module.exports = LoginService