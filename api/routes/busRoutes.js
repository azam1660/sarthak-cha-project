import express from "express";
import {
  createBusRoute,
  addOrUpdateStop,
  getBusDetails,
  getNearbyBuses,
  addStop,
  removeStop,
  getBusLocation,
} from "../controllers/busController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createBusRoute);
router.put("/:busCode/stops", authMiddleware, addOrUpdateStop);
router.get("/:busCode", getBusDetails);
router.post("/nearby", getNearbyBuses);
router.post("/:busCode/stops", addStop);
router.delete("/:busCode/stops/:stopId", removeStop);
router.get("/bus/:busId", getBusLocation);
export default router;
