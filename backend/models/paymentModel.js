import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: ["card", "cash", "insurance"],
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    cardDetails: {
      cardNumber: { type: String },
      expiry: { type: String },
      cvc: { type: String },
    },
    insuranceDetails: {
      policyNumber: { type: String },
      provider: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
