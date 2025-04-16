import express from "express";
const router = express.Router();
import {
  createEmergencyRequest,
  getEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyRequest,
  deleteEmergencyRequest,
} from "../controllers/emergencyRequestController.js";

// Routes
router.route("/").post(createEmergencyRequest).get(getEmergencyRequests); // Create and get all requests
router
  .route("/:id")
  .get(getEmergencyRequestById) // Get a specific request by ID
  .put(updateEmergencyRequest)  // Update request
  .delete(deleteEmergencyRequest); // Delete request

export default router;
