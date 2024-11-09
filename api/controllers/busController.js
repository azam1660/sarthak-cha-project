import Bus from "../models/Bus.js";

export const getNearbyBuses = async (req, res) => {
  const { latitude, longitude, radius } = req.body;
  try {
    const nearbyBuses = await BusService.getNearbyBuses(
      latitude,
      longitude,
      radius
    );
    res.status(200).json(nearbyBuses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve nearby buses",
      error: error.message,
    });
  }
};

// Update bus location
export const updateBusLocation = async (req, res) => {
  const { busId, routeId, latitude, longitude, speed, heading } = req.body;
  try {
    const bus = await BusService.updateBusLocation(
      busId,
      routeId,
      latitude,
      longitude,
      speed,
      heading
    );
    res.status(200).json(bus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update bus location", error: error.message });
  }
};

// Get location of a specific bus
export const getBusLocation = async (req, res) => {
  try {
    const { busId } = req.params;
    const bus = await Bus.findOne({ busId });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve bus location",
      error: error.message,
    });
  }
};

// Get all buses on a specific route
export const getBusesByRoute = async (req, res) => {
  try {
    const { routeId } = req.params;
    const buses = await Bus.find({ routeId });

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve buses by route",
      error: error.message,
    });
  }
};
