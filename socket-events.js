var usernames = {};

module.exports = function socketEvents(io) {
  return function onSocketConnection(socket) {
    socket.on('adduser', onAddUser);
    socket.on('sendchat', onSendChat);
    socket.on('disconnect', onSocketDisconnect);

    function onAddUser(username) {
      socket.username = username;
      usernames[username] = username;
      socket.emit('updatechat', username, 'is connected.');
      io.sockets.emit('updateusers', usernames);
    }

    function onSendChat(message) {
      io.sockets.emit('updatechat', socket.username, message);
    }

    function onSocketDisconnect() {
      delete usernames[socket.username];
      io.sockets.emit('updateusers', usernames);
      socket.broadcast.emit('updatechat', 'Server', socket.username + ' has disconnected.');
    }
  }
}
