const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {sendMessage} = require('./client.js');

const { Server } = require("socket.io");

const io = new Server(server, {cors: {
  origin: "*",
  methods: ["GET", "POST"]
},
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/sendMessage', (req, res) => {
  sendMessage('Hello');
  res.status(200).json({});
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // io.emit('chat message', `${msg}`);
    socket.broadcast.emit('chat message', `${msg}`);
  });
  socket.on('server message', (msg) => {
    console.log('server message: ' + msg);
    // io.emit('chat message', `${msg}`);
    socket.broadcast.emit('chat message', `${msg}`);
  });
  socket.on('typing', data => {
    socket.broadcast.emit('user typing', `${socket.id}`);
  })
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});