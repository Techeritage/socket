const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json()); // For parsing application/json

// Endpoint to emit events
app.post("/emit", (req, res) => {
  const { event, data } = req.body;
  io.emit(event, data); // Emit the event with the data
  console.log(`Emitted event: ${event}`, data);
  res.status(200).send("Event emitted");
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});