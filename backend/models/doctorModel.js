import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema(
  {

    doctorname: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      required: true,
  
    },
    experience:{
      type: String,
      required: true,
    },
  
    starttime: {
      type: String,
      required: true,
      
    },date: {
      type: Date,
      required: true,
      
    },
    slot: {
      type: Number,
      required: true,
      
    },
    fee:{
      type: Number,
      required: true,
    },
    timings: {
      type: String,
      required: true,
      
    },
    
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;