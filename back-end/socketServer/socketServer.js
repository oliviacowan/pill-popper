const socketio = require('socket.io');

const listen = function(httpServer) {
  const server = socketio(httpServer);
  server.on('connection', () => { 'Client has connected to the socket server' });
  return server;
}

module.exports = { listen };