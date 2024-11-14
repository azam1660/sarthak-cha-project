"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Navigation, GaugeIcon as Speedometer } from "lucide-react";

export default function BusTracker() {
  const [socket, setSocket] = useState("");
  const [busCode, setBusCode] = useState("");
  const [locationUpdate, setLocationUpdate] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("busLocationUpdate", (update) => {
      setLocationUpdate(update);
    });

    return () => {
      socket.off("busLocationUpdate");
    };
  }, [socket]);

  const handleTrackBus = () => {
    if (!socket || !busCode) return;

    if (isTracking) {
      socket.emit("untrackBus", busCode);
      setIsTracking(false);
      setLocationUpdate(null);
    } else {
      socket.emit("trackBus", busCode);
      setIsTracking(true);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Real-Time Bus Tracker</CardTitle>
        <CardDescription>Enter a bus code to start tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter bus code"
            value={busCode}
            onChange={(e) => setBusCode(e.target.value)}
            disabled={isTracking}
          />
          <Button onClick={handleTrackBus}>
            {isTracking ? "Stop Tracking" : "Start Tracking"}
          </Button>
        </div>
        {locationUpdate && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>
                Latitude: {locationUpdate.location.latitude.toFixed(6)},
                Longitude: {locationUpdate.location.longitude.toFixed(6)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Speedometer className="w-5 h-5 text-green-500" />
              <span>Speed: {locationUpdate.speed} km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-red-500" />
              <span>Heading: {locationUpdate.heading}°</span>
            </div>
            <div>
              Last updated:{" "}
              {new Date(locationUpdate.updatedAt).toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
