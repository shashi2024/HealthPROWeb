import asyncHandler from "express-async-handler";
import Payment from "../models/paymentModel.js"; // Import Payment model

// @desc    Process Payment
// @route   POST /api/payments/pay
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
  const { amount, method, cardDetails, insuranceDetails } = req.body;

  // Validate fields
  if (!amount || !method) {
    res.status(400);
    throw new Error("Amount and payment method are required");
  }

  let paymentStatus = "Pending";

  if (method === "card") {
    if (
      !cardDetails ||
      !cardDetails.cardNumber ||
      !cardDetails.expiry ||
      !cardDetails.cvc
    ) {
      res.status(400);
      throw new Error("Card details are required for card payment");
    }
    // Simulate card payment processing
    paymentStatus = "Paid";
  } else if (method === "cash") {
    paymentStatus = "Pending";
  } else if (method === "insurance") {
    if (
      !insuranceDetails ||
      !insuranceDetails.policyNumber ||
      !insuranceDetails.provider
    ) {
      res.status(400);
      throw new Error("Insurance details are required for insurance claim");
    }
    paymentStatus = "Pending";
  } else {
    res.status(400);
    throw new Error("Invalid payment method");
  }

  // Save the payment record
  const payment = await Payment.create({
    user: req.user._id,
    amount,
    method,
    status: paymentStatus,
    cardDetails: method === "card" ? cardDetails : null,
    insuranceDetails: method === "insurance" ? insuranceDetails : null,
  });

  if (payment) {
    res.status(201).json({
      paymentId: payment._id,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
    });
  } else {
    res.status(400);
    throw new Error("Payment processing failed");
  }
});

// @desc    Get Payment Details by ID
// @route   GET /api/payments/getpay/:id
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (payment) {
    res.status(200).json(payment);
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

const getPaymentsByPatient = asyncHandler(async (req, res) => {
  const patientId = req.params.patientId;

  const payments = await Payment.find({ user: patientId });

  if (payments) {
    res.status(200).json(payments);
  } else {
    res.status(404);
    throw new Error("No Payments for this patients");
  }
});

const getAllPayments = asyncHandler(async (req, res) => {
  try {
    const paymentData = await Payment.find();

    if (!paymentData) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.status(200).json(paymentData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const getOnePaymentById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const paymentExist = await Payment.findById(id);

    if (!paymentExist) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    res.status(200).json(paymentExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const updatePaymentDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const paymentExist = await Payment.findById(id);

    if (!paymentExist) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    const updateData = await Payment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Payment Approved Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const deletePaymentDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const paymentExist = await Payment.findById(id);

    if (!paymentExist) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    await Payment.findByIdAndDelete(id);
    res.status(200).json({ msg: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export {
  processPayment,
  getPaymentDetails,
  getPaymentsByPatient,
  updatePaymentDetails,
  deletePaymentDetails,
  getAllPayments,
  getOnePaymentById,
};
