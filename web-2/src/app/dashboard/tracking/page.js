"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ProtectedRoute from "@/components/ProtectedRoute";

const Tracking = () => {
  const [location, setLocation] = useState({});
  const [deviceLocation, setDeviceLocation] = useState(null); // Store device location
  const socket = io("http://localhost:5000");

  useEffect(() => {
    // Fetch the user's device location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDeviceLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching device location:", error);
        }
      );
    }

    // Listen for real-time bus location updates
    socket.emit("trackBus", "busCode123");

    socket.on("busLocationUpdate", (data) => {
      if (data.busCode === "busCode123") {
        setLocation(data.location); // Update bus location
      }
    });

    // Cleanup on component unmount
    return () => socket.disconnect();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1>Real-Time Tracking</h1>
        {deviceLocation && (
          <div>
            <h3>Device Location:</h3>
            <p>Latitude: {deviceLocation.latitude}</p>
            <p>Longitude: {deviceLocation.longitude}</p>
          </div>
        )}
        <div>
          <h3>Bus Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Tracking;
