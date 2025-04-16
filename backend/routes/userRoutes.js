import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getPatients,
  addNewUser,
  getAllUsers,
  getOneUserById,
  updateUserDetails,
  deleteUserDetails,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/patients", protect, getPatients); // Protect ensures only authenticated users can access

router.post("/addnewuser", addNewUser);
router.get("/getallusers", getAllUsers);
router.get("/getoneuser/:id", getOneUserById);
router.put("/updateuser/:id", updateUserDetails);
router.delete("/deleteuser/:id", deleteUserDetails);

export default router;
