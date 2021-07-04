const io =require('socket.io-client');
const socket =  io('http://localhost:4000');

const sendMessage = (msg) => {
  console.log(' I am emitting')
  socket.emit('server message', 'from server' + msg)
}

module.exports = {
  sendMessage
}