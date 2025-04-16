import express from "express";
import {
  processPayment,
  getPaymentDetails,
  getPaymentsByPatient,
  getAllPayments,
  getOnePaymentById,
  updatePaymentDetails,
  deletePaymentDetails,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pay", protect, processPayment);
router.get("/getpay/:id", getPaymentDetails);
router.get("/getpayment/:patientId", getPaymentsByPatient);
router.get("/getallpayments", getAllPayments);
router.get("/getonepayment/:id", getOnePaymentById);
router.put("/updatepayment/:id", updatePaymentDetails);
router.delete("/deletepayment/:id", deletePaymentDetails);

export default router;
