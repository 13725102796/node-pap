
const jwt = require('jsonwebtoken');
module.exports = () => {
  
  return async function (ctx, next) {
    // console.log(ctx.request.header.cookie.get('token'))
    // console.log(ctx.request.header.cookie.get('token'))
    const tokenData = ctx.request.header['authorization']
    if (tokenData) {
      let token = tokenData
      console.log(token)
      let decoded;
      //解码token
      try {
        decoded = jwt.verify(token, 'shhhhh');
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          console.log('时间到期')
          
          ctx.body = {
            msg: 'token时间到期',
            status: 'error'
          }
          //重新发放令牌
          // token = jwt.sign({
          //   user_id: 1,
          //   user_name: '张三'
          // }, 'sinner77', {
          //   expiresIn: '60s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
          // });
          // ctx.cookies.set('token', token, {
          //   maxAge: 60 * 1000,
          //   httpOnly: false,
          //   overwrite: true,
          //   signed: false
          // });
        } else {
          ctx.status = 401;
          ctx.body = {
            message: 'token失效'
          }
          return;
        }
      }
      console.log(decoded.user_id)
      //重置cookie时间
      // ctx.cookies.set('token', token, {
      //   maxAge: 60 * 1000,
      //   httpOnly: false,
      //   overwrite: true,
      //   signed: false
      // });
      ctx.user_id = decoded.user_id
      await next();

    } else {
      ctx.status = 401;
      ctx.body = {
        status: 'error',
        msg: '没有权限访问，token丢失'
      }
      return;
    }
  }
};