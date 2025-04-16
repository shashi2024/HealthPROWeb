// models/deletedAppointmentModel.js
import mongoose from 'mongoose';

// Define the schema for the Deleted Appointment
const deletedAppointmentSchema = new mongoose.Schema({
  name: String,
  hospitalName: String,
  doctorName: String,
  date: Date,
  starttime: String,
  
});

// Export the DeletedAppointment model
export default mongoose.model('DeletedAppointment', deletedAppointmentSchema);
