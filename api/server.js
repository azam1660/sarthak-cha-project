import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import config from "./config/config.js";
import busRoutes from "./routes/busRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import cors from "cors"; // Import CORS

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow listed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies and headers if needed
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/analytics", analyticsRoutes);
mongoose
  .connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("trackBus", (busCode) => {
    socket.join(busCode);
    console.log(`Student connected to track bus: ${busCode}`);
  });

  socket.on(
    "updateLocation",
    ({ busCode, latitude, longitude, speed, heading }) => {
      const locationUpdate = {
        busCode,
        location: { latitude, longitude },
        speed,
        heading,
        updatedAt: new Date(),
      };

      io.to(busCode).emit("busLocationUpdate", locationUpdate);
    }
  );

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

export default io;
