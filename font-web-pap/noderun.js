const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 3000;

var server = http.createServer()


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// server.on('request',function(){
//   console.log('收到客户端发出的请求.......');
// });

server.on('request',function(request,response){
  // let path = './index.html'
  var url = request.url == '/' ? '/index.html' :  request.url;
  // console.log(url)
  if(url && url.indexOf('html') > -1){
    //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
    response.writeHead(200,{'Content-Type':'text/html'})
  } 

  fs.readFile( __dirname + '/dist' + url,function(err,data){
    if(err){
      response.writeHead(404)
      throw err ;
    }
    response.end(data);
  });
})
