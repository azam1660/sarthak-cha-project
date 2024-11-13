import mongoose from "mongoose";

const IncidentReportSchema = new mongoose.Schema({
  busCode: { type: String, required: true },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  incidentType: {
    type: String,
    enum: ["delay", "breakdown", "other"],
    required: true,
  },
  description: { type: String },
  reportedAt: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

export default mongoose.model("IncidentReport", IncidentReportSchema);
