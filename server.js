require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import cors middleware

const app = express();

// Use cors middleware for handling cross-origin requests (use your frontend domain)
app.use(cors({
  origin: "https://stock-paddy.vercel.app", // Allow requests from your Vercel frontend
  methods: ["GET", "POST"], // Specify allowed HTTP methods
  credentials: true // If you're handling cookies/auth, set this to true
}));

const server = http.createServer(app);

// Initialize Socket.IO with CORS support
const io = new Server(server, {
  cors: {
    origin: "https://your-frontend-domain.com", // Your Vercel frontend URL
    methods: ["GET", "POST"],
    credentials: true // Ensure credentials are allowed (cookies, etc.)
  }
});

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