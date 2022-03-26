const socketio = require('socket.io');

const listen = function(httpServer) {
  console.log('in socket server')
  const server = socketio(httpServer);
  server.on('connection', () => { 'Client has connected to the socket server' });
  return server;
}

module.exports = { listen };