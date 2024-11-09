// services/passengerService.js
import Passenger from "../models/Passenger.js";

class PassengerService {
  // Update passenger location
  async updatePassengerLocation(passengerId, latitude, longitude) {
    const passenger = await Passenger.findOneAndUpdate(
      { passengerId },
      { latitude, longitude, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );
    return passenger;
  }

  // Add or update passenger favorite routes
  async addFavoriteRoute(passengerId, routeId) {
    const passenger = await Passenger.findOneAndUpdate(
      { passengerId },
      { $addToSet: { favoriteRoutes: routeId } }, // $addToSet prevents duplicates
      { new: true, upsert: true }
    );
    return passenger;
  }

  // Get passenger data, including location and favorite routes
  async getPassengerData(passengerId) {
    const passenger = await Passenger.findOne({ passengerId });
    if (!passenger) throw new Error("Passenger not found");
    return passenger;
  }
}

export default new PassengerService();
