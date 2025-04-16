import mongoose from "mongoose";

// Create a schema with added fields and validation
const RecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },

    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
        
    },
    age: {
        type: Number,
        required: true,
        min: 0 // Ensure that age cannot be negative
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    emergencyContact: {
        type: Number,
        required: true,
        
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    familymember: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    pastcondition: {
        type: String,
        required: true
    },
    surgery: {
        type: String,
        required: true
    },
    
    currentmedicine: {
        type: String,
        required: true
    },
    drugName: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    allergies: {
        type: String,
        required: true
    },
    smokingHabits:{
        type: String,
        required: true
    },
    pregnancies: {
        type: String,
        default: ''
    },
    menstrualHistory: {
        type: String,
        default: ''
    },
    treatment: {
        type: String,
        default: ''
    },
    startDate: {
        type: Date,
        required: true
        
    },
    prescribingDoctor: {
        type: String,
        required: true
    },
    
   
});

export default mongoose.model("Record", RecordSchema);
