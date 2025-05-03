// models/alertModel.js
import mongoose from "mongoose";
import crypto from "crypto";

const alertSchema = new mongoose.Schema({
  location: String,
  symptoms: [String],
  status: String,
  dateTime: Date,
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: '2dsphere'
  },
  hashKey: {
    type: String,
    unique: true
  }
}, { timestamps: true });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
