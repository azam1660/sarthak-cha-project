// controllers/analyticsController.js
import Bus from "../models/Bus.js";
import UsageLog from "../models/UsageLog.js"; // Assuming usage logs are tracked here

// Get performance analytics for a specified bus
export const getBusPerformanceAnalytics = async (req, res) => {
  const { busCode } = req.params;

  try {
    const bus = await Bus.findOne({ busCode });

    if (!bus) {
      return res.status(404).json({ success: false, message: "Bus not found" });
    }

    // Calculate on-time percentage (Example: based on scheduled vs. actual arrival times)
    const onTimePercentage = await calculateOnTimePercentage(busCode);

    // Usage count (Example: tracking how often students view this bus's location)
    const usageCount = await calculateUsageCount(busCode);

    const analytics = { onTimePercentage, usageCount };

    res.status(200).json({ success: true, analytics });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve analytics",
        error: error.message,
      });
  }
};

// Helper function to calculate on-time percentage
async function calculateOnTimePercentage(busCode) {
  // Placeholder: Retrieve and calculate on-time performance based on logs or arrival data
  // This could involve comparing scheduled arrival times with actual timestamps
  const scheduledArrivals = await UsageLog.find({
    busCode,
    status: "scheduled",
  });
  const onTimeArrivals = await UsageLog.find({ busCode, status: "on-time" });

  if (scheduledArrivals.length === 0) return 100;

  const percentage = (onTimeArrivals.length / scheduledArrivals.length) * 100;
  return Math.round(percentage);
}

// Helper function to calculate usage count
async function calculateUsageCount(busCode) {
  // Placeholder: Retrieve and count how many times this bus has been tracked by students
  const usageLogs = await UsageLog.countDocuments({ busCode, action: "track" });
  return usageLogs;
}
