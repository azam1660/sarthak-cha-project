// controllers/passengerController.js
import Passenger from "../models/Passenger.js";

// Update passenger location
export const updatePassengerLocation = async (req, res) => {
  try {
    const { passengerId, latitude, longitude } = req.body;

    // Find passenger by ID and update or create if not existing
    const passenger = await Passenger.findOneAndUpdate(
      { passengerId },
      { latitude, longitude, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json(passenger);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update passenger location",
        error: error.message,
      });
  }
};

// Add or update passenger favorite routes
export const addFavoriteRoute = async (req, res) => {
  try {
    const { passengerId, routeId } = req.body;

    // Find passenger and update their favorite routes
    const passenger = await Passenger.findOneAndUpdate(
      { passengerId },
      { $addToSet: { favoriteRoutes: routeId } }, // $addToSet prevents duplicates
      { new: true, upsert: true }
    );

    res.status(200).json(passenger);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add favorite route", error: error.message });
  }
};

// Get passenger data, including location and favorite routes
export const getPassengerData = async (req, res) => {
  try {
    const { passengerId } = req.params;
    const passenger = await Passenger.findOne({ passengerId });

    if (!passenger) {
      return res.status(404).json({ message: "Passenger not found" });
    }

    res.status(200).json(passenger);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve passenger data",
        error: error.message,
      });
  }
};
