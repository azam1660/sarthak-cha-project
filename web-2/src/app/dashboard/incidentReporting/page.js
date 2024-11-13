"use client";
import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { reportIncident } from "../../utils/api"; // Create an incident API in the backend

const IncidentReporting = () => {
  const [description, setDescription] = useState("");

  const handleReport = async () => {
    try {
      await reportIncident({ busCode: "busCode123", description });
      alert("Incident reported successfully");
    } catch (error) {
      console.error("Failed to report incident", error);
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <h1>Incident Reporting</h1>
        <textarea
          placeholder="Describe the incident"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleReport}>Report Incident</button>
      </div>
    </ProtectedRoute>
  );
};

export default IncidentReporting;
