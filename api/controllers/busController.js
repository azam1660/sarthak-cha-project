import Bus from "../models/Bus.js";

export const createBusRoute = async (req, res) => {
  const { busCode, route, timing, stops } = req.body;
  try {
    const bus = new Bus({ busCode, route, timing, stops });
    await bus.save();
    res.status(201).json({ success: true, bus });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create bus route", details: error.message });
  }
};

export const addOrUpdateStop = async (req, res) => {
  const { busCode } = req.params;
  const { stopName, latitude, longitude, arrivalTimeEstimate } = req.body;
  try {
    const bus = await Bus.findOne({ busCode });
    if (!bus) return res.status(404).json({ error: "Bus not found" });

    const existingStop = bus.stops.find((stop) => stop.stopName === stopName);
    if (existingStop) {
      existingStop.latitude = latitude;
      existingStop.longitude = longitude;
      existingStop.arrivalTimeEstimate = arrivalTimeEstimate;
    } else {
      bus.stops.push({ stopName, latitude, longitude, arrivalTimeEstimate });
    }

    await bus.save();
    res.status(200).json({ success: true, bus });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add or update stop", details: error.message });
  }
};

export const getBusDetails = async (req, res) => {
  const { busCode } = req.params;
  console.log(busCode);

  try {
    const bus = await Bus.findOne({ busCode }).populate(
      "routeDetails timing stops"
    );
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    console.log(bus);
    res.status(200).json({ success: true, bus });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve bus details",
      details: error.message,
    });
  }
};

export const getNearbyBuses = async (req, res) => {
  const { latitude, longitude, radius } = req.body;

  try {
    const nearbyBuses = await BusService.getNearbyBuses(
      latitude,
      longitude,
      radius
    );

    res.status(200).json({
      success: true,
      nearbyBuses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve nearby buses",
    });
  }
};

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

export const getBusLocation = async (req, res) => {
  try {
    const { busId } = req.params;
    // Use findOne to find a bus by its unique identifier
    const bus = await Bus.findOne({ busCode: busId });

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ success: true, bus });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve bus location",
      error: error.message,
    });
  }
};

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

export const addStop = async (req, res) => {
  const { busCode } = req.params;
  const { stopName, latitude, longitude, arrivalTimeEstimate } = req.body;

  try {
    const bus = await Bus.findOne({ busCode });

    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    const newStop = { stopName, latitude, longitude, arrivalTimeEstimate };
    bus.stops.push(newStop);

    await bus.save();

    res.status(201).json({ success: true, stop: newStop });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add stop",
      error: error.message,
    });
  }
};

export const removeStop = async (req, res) => {
  const { busCode, stopId } = req.params;

  try {
    const bus = await Bus.findOne({ busCode });

    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    bus.stops = bus.stops.filter((stop) => stop._id.toString() !== stopId);

    await bus.save();

    res
      .status(200)
      .json({ success: true, message: "Stop removed successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove stop",
      error: error.message,
    });
  }
};
