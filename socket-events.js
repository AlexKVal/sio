var usernames = {};

module.exports = function onSocketConnection(socket) {
  function onAddUser(username) {
    socket.username = username;
    usernames[username] = username;
    socket.emit('updateChat', 'Server', 'you have connected');
  }

  function onSendChat(message) {
    io.sockets.emit('updateChat', socket.username, message);
  }

  function onSocketDisconnect() {
    delete usernames[socket.username];
    io.sockets.emit('updateUsers', usernames);
    socket.broadcast.emit('updateChat', 'Server', socket.username + ' has disconnected.');
  }

  socket.on('addUser', onAddUser);
  socket.on('sendChat', onSendChat);
  socket.on('disconnect', onSocketDisconnect);
}
