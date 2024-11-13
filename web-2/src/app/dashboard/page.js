"use client";
import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { addStop } from "../../utils/api";

const Dashboard = () => {
  const [stopName, setStopName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [arrivalTimeEstimate, setArrivalTimeEstimate] = useState(""); // New state for arrival time

  const handleAddStop = async () => {
    try {
      // Ensure the latitude and longitude are valid numbers
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);

      if (isNaN(lat) || isNaN(lon)) {
        alert("Please enter valid latitude and longitude");
        return;
      }

      // Ensure the arrival time is valid
      if (!arrivalTimeEstimate) {
        alert("Please enter a valid arrival time estimate");
        return;
      }

      // Pass the busCode, stop data (including arrival time), to the addStop API
      await addStop("a10", {
        stopName,
        latitude: lat,
        longitude: lon,
        arrivalTimeEstimate, // Send arrival time estimate
      });

      alert("Stop added successfully");
    } catch (error) {
      console.error("Failed to add stop", error);
      alert("Error adding stop. Please check the bus code and try again.");
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <div>
          <h2>Manage Stops</h2>
          <input
            type="text"
            placeholder="Stop Name"
            value={stopName}
            onChange={(e) => setStopName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Arrival Time Estimate (e.g., 08:30 AM)"
            value={arrivalTimeEstimate}
            onChange={(e) => setArrivalTimeEstimate(e.target.value)} // Handle arrival time change
          />
          <button onClick={handleAddStop}>Add Stop</button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
