var http = require('http');
var express = require('express');
var socketio = require('socket.io');
var socketEvents= require('./socket-events');

var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var server = http.createServer(app);
var io = socketio(server);

var onSocketConnection = socketEvents(io);

io.on('connection', onSocketConnection);

server.listen(8080);
