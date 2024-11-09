// utils/socketHandlers.js

export const handleSocketConnection = (socket, io) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for a bus location update from a bus or GPS source
  socket.on("busLocationUpdate", (busData) => {
    // Emit the bus location to all clients tracking this bus
    io.emit("busLocationUpdate", busData);
  });

  // Listen for a passenger location update from the passenger device
  socket.on("passengerLocationUpdate", (passengerData) => {
    io.emit("passengerLocationUpdate", passengerData);
  });

  // Notify all clients about route changes or delays
  socket.on("routeStatusUpdate", (statusData) => {
    io.emit("routeStatusUpdate", statusData);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};
