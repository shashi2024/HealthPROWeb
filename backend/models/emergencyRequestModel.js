import mongoose from "mongoose";


const emergencyReqSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      unique: true,
    },
    contactnumber: {
      type: Number,
      required: true,
    },
    symptoms: {
      type: [String],
      required: true,
    },
    urgencylevel: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    additional: {
        type: String,
        required: true,
    }
  
},{ timestamps: true });

export default mongoose.model('EmergencyReq', emergencyReqSchema);