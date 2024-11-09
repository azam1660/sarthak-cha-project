// models/Bus.js
import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
  busId: {
    type: String,
    required: true,
    unique: true,
  },
  routeId: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number, // Optional: speed of the bus in km/h or mph
    default: 0,
  },
  heading: {
    type: Number, // Optional: heading direction in degrees
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Bus", BusSchema);
