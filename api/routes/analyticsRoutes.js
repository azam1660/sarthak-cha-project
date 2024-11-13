// routes/analyticsRoutes.js
import express from "express";
import { getBusPerformanceAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/:busCode", getBusPerformanceAnalytics); // Get performance analytics for a bus

export default router;
