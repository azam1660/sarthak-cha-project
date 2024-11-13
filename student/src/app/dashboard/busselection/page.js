// app/BusSelection.js
"use client";

import { useEffect, useState } from "react";
import { getBusDetails } from "@/utils/api";
import { Bus, Clock, Users, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function BusSelection() {
  const busCode = "a10";
  const [busDetails, setBusDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusDetails = async () => {
      setError("");
      try {
        const { data } = await getBusDetails(busCode);
        setBusDetails(data);
      } catch (err) {
        setError("Failed to fetch bus details");
        console.error(err);
      }
    };

    if (busCode) fetchBusDetails();
  }, [busCode]);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle size={24} />
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="w-full bg-[#fffaef] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#59458d] flex items-center">
            <Bus className="mr-2" /> Bus Details
          </CardTitle>
          <CardDescription>Information about bus {busCode}</CardDescription>
        </CardHeader>
        <CardContent>
          {busDetails ? (
            <BusDetailsContent busDetails={busDetails} />
          ) : (
            <LoadingSkeleton />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const BusDetailsContent = ({ busDetails }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InfoItem label="Bus Code" value={busDetails.bus.busCode} />
      <InfoItem label="Route" value={busDetails.bus.route} />
      <InfoItem label="Timing" icon={<Clock />} value={busDetails.bus.timing} />
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-[#59458d]">
        Performance Stats
      </h3>
      <div className="space-y-2">
        <p className="text-sm">On-Time Percentage</p>
        <Progress
          value={busDetails.bus.performanceStats.onTimePercentage}
          className="w-full"
        />
        <p className="text-right text-sm">
          {busDetails.bus.performanceStats.onTimePercentage}%
        </p>
      </div>
      <p className="flex items-center">
        <Users className="mr-2" size={16} />
        Usage Count: {busDetails.bus.performanceStats.usageCount}
      </p>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-[#59458d]">Location</h3>
      <div className="h-[400px] rounded-lg overflow-hidden">
        location:
        {busDetails.bus.location.coordinates}
        {/* {busDetails.bus.stops} */}
        <br />
        bus Code
        {busDetails.bus.busCode}
        {/* <MapComponent
          busLocation={busDetails.bus.location.coordinates}
          stops={busDetails.bus.stops}
          busCode={busDetails.bus.busCode}
        /> */}
      </div>
    </div>

    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-[#59458d]">Stops</h3>
      <ul className="space-y-4">
        {busDetails.bus.stops.map((stop) => (
          <li key={stop._id} className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">{stop.stopName}</p>
            <p className="text-sm text-gray-600">
              Lat: {stop.latitude}, Long: {stop.longitude}
            </p>
            <p className="text-sm">
              <Clock className="inline mr-1" size={14} />
              Arrival: {stop.arrivalTimeEstimate}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const InfoItem = ({ label, value, icon = null }) => (
  <div className="space-y-2">
    <p className="font-semibold text-[#59458d]">{label}</p>
    <p className="flex items-center">
      {icon} {value}
    </p>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
    <Skeleton className="h-[400px] w-full" />
  </div>
);
