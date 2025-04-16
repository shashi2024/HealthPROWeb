// routes/appointmentRoutes.js
import express from 'express';
import {
  createAppointment,
  getAllAppointments,
 
  getDoctorsBySpecialization,getDoctorByName,appointmentdelete,appointmentgetone,
  updateAppointment,
  getDeletedAppointments,getDeletedAppointmentsPatient,
  getRecentAppointmentsForHeatmap
} from '../controllers/appointmentController.js';

const router = express.Router();

// Route to create appointment
router.post('/createAppointment', createAppointment);

// Route to get all appointments (for patient)
router.get('/getAllAppointments', getAllAppointments);

// Route to get all appointments (for admin)
router.get('/getAllAppointmentsAdmin', getAllAppointments);

router.get("/appointmentgetone/:id",appointmentgetone);



router.put('/updateAppointment/:id', updateAppointment); // Ensure this route is registered

// Route to delete appointment status (for admin)
router.put('/appointmentdelete/:id', appointmentdelete);

router.get('/getDeletedAppointments', getDeletedAppointments);

router.get('/getDeletedAppointmentsPatient', getDeletedAppointmentsPatient);

// Route to get doctors by specialization
router.get('/doctor/:specialization/:hospitalName', getDoctorsBySpecialization);

// Fetch doctor by name (for date and time auto-fill)
router.get('/doctor/:doctorname', getDoctorByName);

// routes/appointmentRoutes.js
router.get('/heatmap', getRecentAppointmentsForHeatmap);






export default router; 
