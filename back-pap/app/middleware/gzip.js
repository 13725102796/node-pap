// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
  return async function gzip(ctx, next) {
    // console.warn(ctx);
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080'); // * 这个表示任意域名都可以访问，这样写不能携带cookie了。 || 'http://localhost:5080'
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8000')
    // ctx.set('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据,
    // // 若前端上axios.defaults.withCredentials = true设置为true了，
    // // 则Access-Control-Allow-Credentials必须为true,否则会请求失败，报错
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'); //它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段
    // ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); //设置方法
    // console.log(ctx)
    // console.log(ctx.method)
    
    await next();
    // 后续中间件执行完成后将响应体转换成 gzip
    
    let body = ctx.body;
    if (!body) return;
     
    // ctx.status=200

    // 支持 options.threshold
    if (options.threshold && ctx.length < options.threshold) return;

    if (isJSON(body)) body = JSON.stringify(body);

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};