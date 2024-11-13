import mongoose from "mongoose";

const usageLogSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  busCode: {
    type: String,
    required: false, // Only required if tracking bus-specific actions
  },
  eventType: {
    type: String,
    enum: ["login", "logout", "trackBus", "stopTracking", "notificationViewed"],
    required: true,
  },
  eventDetails: {
    type: Object, // Additional details, if any (e.g., location for tracking)
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UsageLog", usageLogSchema);
