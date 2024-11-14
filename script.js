"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL
const busCode = "a10";
export default function StudentReceiver() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    socket.emit("trackBus", busCode);

    socket.on("busLocationUpdate", (data) => {
      if (data.busCode === busCode) {
        setLocation(data.location);
      }
    });

    return () => {
      socket.off("busLocationUpdate");
    };
  }, [busCode]);

  return (
    <div>
      <h1>Student Receiver</h1>
      <p>Tracking Bus Code: {busCode}</p>
      <p>Latitude: {location.latitude || "N/A"}</p>
      <p>Longitude: {location.longitude || "N/A"}</p>
    </div>
  );
}
