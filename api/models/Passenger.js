// models/Passenger.js
import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema({
  passengerId: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteRoutes: [
    {
      type: String, // Array of route IDs or bus IDs the user wants to track
    },
  ],
  latitude: {
    type: Number,
    default: null, // Latitude of the passenger's current location
  },
  longitude: {
    type: Number,
    default: null, // Longitude of the passenger's current location
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Passenger", PassengerSchema);
