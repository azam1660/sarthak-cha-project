// routes/passengerRoutes.js
import express from "express";
import {
  updatePassengerLocation,
  addFavoriteRoute,
  getPassengerData,
} from "../controllers/passengerController.js";

const router = express.Router();

router.post("/update-location", updatePassengerLocation);
router.post("/add-favorite-route", addFavoriteRoute);
router.get("/:passengerId", getPassengerData);

export default router;
