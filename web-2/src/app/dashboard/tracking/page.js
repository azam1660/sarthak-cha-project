"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, MapPin, Navigation, GaugeIcon as Speedometer } from 'lucide-react'
import io from "socket.io-client"

const socket = io("http://localhost:5000") // Replace with your server URL
const busCode = "a10"

export default function GPSTracker() {
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [gpsData, setGpsData] = useState({
    latitude: null,
    longitude: null,
    speed: null,
    heading: null,
    altitude: null,
  })

  useEffect(() => {
    let watchId

    if (isBroadcasting) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, speed, heading, altitude } = position.coords
          const newData = {
            latitude,
            longitude,
            speed: speed !== null ? speed * 3.6 : null, // Convert m/s to km/h
            heading: heading !== null ? heading : null,
            altitude: altitude !== null ? altitude : null,
          }
          setGpsData(newData)
          socket.emit("updateLocation", { busCode, ...newData })
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 0 }
      )
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [isBroadcasting])

  const toggleBroadcast = () => {
    setIsBroadcasting(!isBroadcasting)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Real-Time GPS Tracker</CardTitle>
        <CardDescription>Bus Code: {busCode}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>
            Latitude: {gpsData.latitude !== null ? gpsData.latitude.toFixed(6) : "N/A"}, Longitude:{" "}
            {gpsData.longitude !== null ? gpsData.longitude.toFixed(6) : "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Speedometer className="w-5 h-5 text-green-500" />
          <span>Speed: {gpsData.speed !== null ? `${gpsData.speed.toFixed(2)} km/h` : "N/A"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-red-500" />
          <span>Heading: {gpsData.heading !== null ? `${gpsData.heading.toFixed(2)}°` : "N/A"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-purple-500" />
          <span>Altitude: {gpsData.altitude !== null ? `${gpsData.altitude.toFixed(2)} m` : "N/A"}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={toggleBroadcast} className="w-full">
          {isBroadcasting ? "Stop Broadcasting" : "Start Broadcasting"}
        </Button>
      </CardFooter>
    </Card>
  )
}