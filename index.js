const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (like index.html)
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let roomNo = 1;
let usersInRoom = 0;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.join(`room-${roomNo}`);
  usersInRoom++;

  io.to(`room-${roomNo}`).emit('connectedRoom', {
    message: `You are in room-${roomNo}`,
    room: `room-${roomNo}`
  });

  console.log(`User ${socket.id} joined room-${roomNo}`);

  if (usersInRoom >= 2) {
    roomNo++;
    usersInRoom = 0;
  }

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
