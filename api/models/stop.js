import mongoose from "mongoose";

const StopSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  arrivalTimeEstimate: { type: String },
});

StopSchema.index({ location: "2dsphere" });

export default mongoose.model("Stop", StopSchema);
