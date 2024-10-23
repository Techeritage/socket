require('dotenv').config(); // Add this line at the top of your server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Add more event handlers here if needed
});

// Start the server
const PORT = process.env.PORT || 3001; // This will use PORT from .env or default to 3001
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
