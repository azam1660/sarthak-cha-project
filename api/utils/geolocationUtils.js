// utils/geolocationUtils.js

// Haversine formula to calculate the distance between two points on Earth
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Validates latitude and longitude values
export const isValidCoordinates = (latitude, longitude) => {
  const isValidLatitude =
    typeof latitude === "number" && latitude >= -90 && latitude <= 90;
  const isValidLongitude =
    typeof longitude === "number" && longitude >= -180 && longitude <= 180;
  return isValidLatitude && isValidLongitude;
};

// Get a random coordinate near a given point (useful for testing)
export const getRandomNearbyCoordinate = (
  latitude,
  longitude,
  radius = 0.5
) => {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const r = radius / 6378.1; // Radius in radians
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newLat = latitude + toDegrees(y);
  const newLon = longitude + toDegrees(x / Math.cos(toRadians(latitude)));

  return { latitude: newLat, longitude: newLon };
};
