// models/appointmentModel.js
import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    symptoms: {
      type: [String],
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    starttime: {
      type: String,
      required: true,
    },

    fee: {
      type: Number,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ location: '2dsphere' }); 

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
