// models/alertModel.js
import mongoose from "mongoose";

// const alertSchema = new mongoose.Schema({
//   patientName: String,
//   contactNumber: String,
//   gender: String,
//   ageGroup: String,
//   symptoms: [String],
//   hospital: String,
//   location: String,
//   coordinates: {
//     type: [Number], // [longitude, latitude]
//     index: '2dsphere'
//   },
//   status: { type: String, default: "New" },
//   timestamp: { type: Date, default: Date.now },
// });

const alertSchema = new mongoose.Schema({
  location: String,
  symptoms: [String],
  status: String,
  dateTime: Date,
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: '2dsphere'
  },
}, { timestamps: true });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
