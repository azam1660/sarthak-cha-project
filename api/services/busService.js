// services/busService.js
import Bus from "../models/Bus.js";
import {
  calculateDistance,
  isValidCoordinates,
} from "../utils/geolocationUtils.js";

class BusService {
  // Update bus location
  async updateBusLocation(busId, routeId, latitude, longitude, speed, heading) {
    const bus = await Bus.findOneAndUpdate(
      { busId },
      { routeId, latitude, longitude, speed, heading, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );
    return bus;
  }

  // Get location of a specific bus
  async getBusLocation(busId) {
    const bus = await Bus.findOne({ busId });
    if (!bus) throw new Error("Bus not found");
    return bus;
  }

  // Get all buses on a specific route
  async getBusesByRoute(routeId) {
    return await Bus.find({ routeId });
  }

  // Get nearby buses based on passenger location
  async getNearbyBuses(latitude, longitude, radius) {
    if (
      !isValidCoordinates(latitude, longitude) ||
      typeof radius !== "number" ||
      radius <= 0
    ) {
      throw new Error("Invalid coordinates or radius");
    }

    const buses = await Bus.find();
    const nearbyBuses = buses.filter((bus) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        bus.latitude,
        bus.longitude
      );
      return distance <= radius;
    });

    return nearbyBuses.map((bus) => ({
      busId: bus.busId,
      routeId: bus.routeId,
      latitude: bus.latitude,
      longitude: bus.longitude,
      speed: bus.speed,
      heading: bus.heading,
      distance: calculateDistance(
        latitude,
        longitude,
        bus.latitude,
        bus.longitude
      ), // Add calculated distance
    }));
  }
}

export default new BusService();
