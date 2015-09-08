var http = require('http');
var express = require('express');
var io = require('socket.io');
var onSocketConnection = require('./socket-events');

var app = express();

app.get('/', function (req, res) {
  res.sendfile(__dirname + './index.html');
});

var server = http.createServer(app).listen(8080);

io.listen(server);
io.set('log level', 3);

io.sockets.on('connection', onSocketConnection);