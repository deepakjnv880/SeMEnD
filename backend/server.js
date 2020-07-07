const http = require('http');

const app = require('./app');

const config = require('./config');

const port = process.env.PORT || config.port;// enviroment varible port or config port

const server = http.createServer(app);

server.listen(port);

console.log("Server is running at port number : ",port)