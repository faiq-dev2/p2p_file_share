const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public')); // Serve frontend from public folder

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('join', () => {
    socket.emit('id', socket.id);
  });

  socket.on('signal', ({ to, data }) => {
    io.to(to).emit('signal', { from: socket.id, data });
  });

  socket.on('disconnect', () => console.log('Disconnected:', socket.id));
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
