const Service = require('egg').Service;

class LoginService extends Service {
  async find(option) {
    console.log(option)
    // console.log( this.app.mysql)
    const client1 = this.app.mysql.get('db1');
    // console.log(client1)
    const user = await client1.get('user', {username: option.userName})
    // check pwd
    if(user && user.length > 0) {
      
    }

    return {user}

  }
}

module.exports = LoginService