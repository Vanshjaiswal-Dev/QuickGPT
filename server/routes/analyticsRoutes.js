import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middlewares/auth.js";

const analyticsRouter = express.Router();

analyticsRouter.get('/', protect, getAnalytics);

export default analyticsRouter;
