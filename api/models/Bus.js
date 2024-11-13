import mongoose from "mongoose";

const StopSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  arrivalTimeEstimate: { type: String, required: true }, // e.g., "08:30 AM"
});

const BusSchema = new mongoose.Schema({
  busCode: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  stops: [StopSchema],
  timing: { type: String, required: true },
  routeDetails: { type: String },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] },
  },
  speed: { type: Number, default: 0 },
  heading: { type: Number, default: 0 },
  performanceStats: {
    onTimePercentage: { type: Number, default: 100 },
    usageCount: { type: Number, default: 0 },
  },

  lastUpdated: { type: Date, default: Date.now },
});

BusSchema.index({ location: "2dsphere" });

export default mongoose.model("Bus", BusSchema);
