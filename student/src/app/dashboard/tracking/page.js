"use client";

import { useEffect, useState, useRef } from "react"
import io from "socket.io-client";
import {
  MapPin,
  Gauge,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Tracking() {
  const busCode = "a10";
  const [location, setLocation] = useState({
    latitude: 51.505,
    longitude: -0.09,
    altitude: 0,
  });
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.emit("trackBus", busCode);

    socket.on("busLocationUpdate", (data) => {
      if (data.busCode === busCode) {
        setLocation({
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          altitude: data.location.altitude || 0,
        });
        setSpeed(data.speed || 0);
        setHeading(data.heading || 0);
        setConnectionStatus("connected");
      }
    });

    socket.on("connect_error", () => {
      setConnectionStatus("error");
    });

    return () => {
      socket.off("busLocationUpdate");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [busCode]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [location.latitude, location.longitude],
        zoom: zoom,
        zoomControl: false,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
      markerRef.current = L.marker([
        location.latitude,
        location.longitude,
      ]).addTo(mapRef.current);

      mapRef.current.on("zoomend", () => {
        setZoom(mapRef.current.getZoom());
      });
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], zoom);
      markerRef.current.setLatLng([location.latitude, location.longitude]);
    }
  }, [location, zoom]);

  const handleZoom = (direction) => {
    if (mapRef.current) {
      const newZoom = direction === "in" ? zoom + 1 : zoom - 1;
      mapRef.current.setZoom(newZoom);
    }
  };

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
                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between text-[#59458d]">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <h3 className="font-semibold">Location</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleZoom("out")}
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleZoom("in")}
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div
                    id="map"
                    className="h-64 w-full rounded-lg"
                    aria-label="Map showing bus location"
                  ></div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#59458d]">
                    <Gauge className="h-5 w-5" />
                    <h3 className="font-semibold">Speed</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#b38b35]">
                    {speed.toFixed(1)}{" "}
                    <span className="text-base font-normal text-gray-600">
                      km/h
                    </span>
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#59458d]">
                    <MapPin className="h-5 w-5" />
                    <h3 className="font-semibold">Altitude</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#b38b35]">
                    {location.altitude.toFixed(1)}{" "}
                    <span className="text-base font-normal text-gray-600">
                      meters
                    </span>
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-[#59458d]">
                    <Compass className="h-5 w-5" />
                    <h3 className="font-semibold">Heading</h3>
                  </div>
                  <p className="text-2xl font-bold text-[#b38b35]">
                    {heading.toFixed(1)}°
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-[#59458d]">
                    <MapPin className="h-5 w-5" />
                    <h3 className="font-semibold">Coordinates</h3>
                  </div>
                  <p className="text-lg font-medium text-[#b38b35]">
                    Latitude: {location.latitude.toFixed(6)}
                    <br />
                    Longitude: {location.longitude.toFixed(6)}
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
