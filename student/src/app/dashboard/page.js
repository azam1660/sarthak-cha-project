"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { searchNearbyBuses } from "@/utils/api";
import useNotifications from "@/hooks/useNotifications";
import { MapPin, Search, Bus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [location, setLocation] = useState(null);
  const [nearbyBuses, setNearbyBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const notifications = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setError("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  const handleSearchBuses = async () => {
    if (!location) return;

    setIsLoading(true);
    setError(null);
    try {
      const { data } = await searchNearbyBuses(location);
      setNearbyBuses(data.nearbyBuses);
    } catch (error) {
      console.error("Failed to search nearby buses", error);
      setError("Failed to search nearby buses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4 max-w-4xl">
        <Card className="w-full bg-[#fffaef] shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#59458d] flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.map((notif, index) => (
              <Alert key={index} className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Notification</AlertTitle>
                <AlertDescription>{notif.message}</AlertDescription>
              </Alert>
            ))}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-[#59458d]">
                    Your Location
                  </h2>
                  {location ? (
                    <p className="text-sm text-gray-600">
                      Lat: {location.latitude.toFixed(4)}, Long:{" "}
                      {location.longitude.toFixed(4)}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Fetching your location...
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleSearchBuses}
                  disabled={!location || isLoading}
                  className="bg-[#59458d] hover:bg-[#4a3a73] text-white transition-colors duration-300"
                >
                  <Search className="mr-2 h-4 w-4" /> Search Nearby Buses
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#59458d]">
                  Nearby Buses
                </h3>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : nearbyBuses.length > 0 ? (
                  <ul className="space-y-2">
                    {nearbyBuses.map((bus) => (
                      <li key={bus.busCode}>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left hover:bg-[#b38b35] hover:text-white transition-colors duration-300"
                          onClick={() =>
                            router.push(
                              `/dashboard/tracking?busCode=${bus.busCode}`
                            )
                          }
                        >
                          <Bus className="mr-2 h-4 w-4" /> {bus.busCode}
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">
                    No nearby buses found. Try searching again.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
