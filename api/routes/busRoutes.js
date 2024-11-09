// routes/busRoutes.js
import express from "express";
import {
  updateBusLocation,
  getBusLocation,
  getBusesByRoute,
  getNearbyBuses,
} from "../controllers/busController.js";

const router = express.Router();

router.post("/update-location", updateBusLocation);
router.get("/:busId", getBusLocation);
router.get("/route/:routeId", getBusesByRoute);
router.post("/nearby", getNearbyBuses); // New endpoint for getting nearby buses

export default router;
