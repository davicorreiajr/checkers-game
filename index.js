const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((request, response) => {
  console.log('req.url = ', request.url);
  if (request.url === '/') {
    sendFileContent(response, "index.html", "text/html;charset=UTF-8"); 
  } else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	} else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	} else if (request.url === '/favicon.ico') {
    sendFileContent(response, "src/assets/img/favicon.ico", "image/png")
  } else {
    console.log("Requested URL is: " + request.url); // for debug purposes
    sendFileContent(response, "404.html", "text/html;charset=UTF-8"); 
  }
});

const sendFileContent = (response, fileName, contentType) => {
	fs.readFile(fileName, (err, data) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', contentType);
    response.write(data);
    response.end();
  });
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});