// server.js
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import config from "./config/config.js"; // Import the config
import busRoutes from "./routes/busRoutes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use("/api/buses", busRoutes);

// Connect to MongoDB
mongoose
  .connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle events
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = config.port;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
