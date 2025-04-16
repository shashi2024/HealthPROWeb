import mongoose from "mongoose";


const ambulanceSchema = mongoose.Schema(
  {
    ambulancenumber: {
      type: String,
      required: true,
    },
    vehiclenumber: {
        type: String,
        required: true,
      },
    drivername: {
      type: String,
      required: true,
      unique: true,
    },
    drivercontact: {
      type: Number,
      required: true,
    },
    driveremail: {
        type: String,
        required: true,
    },
    ambulancetype: {
      type: String,
      required: true,
    },
    availability: {
        type: String,
        required: true,
    }
  
},{ timestamps: true });

export default mongoose.model('Ambulance', ambulanceSchema);