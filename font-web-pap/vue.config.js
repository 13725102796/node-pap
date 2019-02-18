const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new PrerenderSPAPlugin({
          // 生成文件的路径，也可以与webpakc打包的一致。
          // 下面这句话非常重要！！！
          // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
          staticDir: path.join(__dirname, 'dist'),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ['/', '/home', '/about'],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event'
          })
        }),
      ],
    };
  },
  // 配置代理
  // devServer: {
  //   // 设置主机地址
  //   host: 'localhost',
  //   // 设置默认端口
  //   port: 8080,
  //   // 设置代理
  //   proxy: {
  //     '/api': {
  //       // 目标 API 地址
  //       target: 'http://127.0.0.1:7001',
  //       // 如果要代理 websockets
  //       ws: true,
  //       // 将主机标头的原点更改为目标URL
  //       changeOrigin: false
  //     }
  //   }
  // }

}