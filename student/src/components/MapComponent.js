import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export default function MapComponent({ busLocation, stops, busCode }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.setView(busLocation, 13);
    }
  }, [map, busLocation]);

  return (
    <MapContainer
      center={busLocation}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={busLocation}>
        <Popup>
          Bus {busCode}
          <br />
          Current Location
        </Popup>
      </Marker>
      {stops.map((stop) => (
        <Marker key={stop._id} position={[stop.latitude, stop.longitude]}>
          <Popup>
            {stop.stopName}
            <br />
            Arrival: {stop.arrivalTimeEstimate}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
