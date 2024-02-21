const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const serverWebSocket = http.createServer(app);
const io = socketIo(serverWebSocket);

app.use(cors({
    origin: '*'
}));

require('./startup/db')();
require('./startup/routes')(app);
 
const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
 
module.exports = server;