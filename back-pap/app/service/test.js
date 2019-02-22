const Service = require('egg').Service;

class TestService extends Service {
  async list(option) {
    console.log(option)
    return option
  }
}

module.exports = TestService;