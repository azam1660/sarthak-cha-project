"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { MapPin, Gauge, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Tracking() {
  const busCode = "a10";
  const [location, setLocation] = useState({});
  const [speed, setSpeed] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      setConnectionStatus("connected");
    });

    socket.on("connect_error", () => {
      setConnectionStatus("error");
    });

    if (busCode) {
      socket.emit("trackBus", busCode);

      socket.on("busLocationUpdate", (data) => {
        if (data.busCode === busCode) {
          setLocation(data.location);
          setSpeed(data.speed);
        }
      });
    }

    return () => socket.disconnect();
  }, [busCode]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="w-full bg-[#fffaef] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#59458d] flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Real-Time Bus Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          {connectionStatus === "error" ? (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>
                Unable to connect to tracking server. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#59458d]">
                    <MapPin className="h-5 w-5" />
                    <h3 className="font-semibold">Location</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      Latitude:{" "}
                      <span className="font-mono">
                        {location.latitude || "N/A"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Longitude:{" "}
                      <span className="font-mono">
                        {location.longitude || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#59458d]">
                    <Gauge className="h-5 w-5" />
                    <h3 className="font-semibold">Speed</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#b38b35]">
                    {speed}{" "}
                    <span className="text-base font-normal text-gray-600">
                      km/h
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center p-2 bg-white rounded-lg">
                <div
                  className={`flex items-center gap-2 ${
                    connectionStatus === "connected"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      connectionStatus === "connected"
                        ? "bg-green-600 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {connectionStatus === "connected"
                      ? "Live Tracking"
                      : "Connecting..."}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
