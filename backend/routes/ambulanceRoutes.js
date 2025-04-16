// ambulanceRoutes.js
import express from 'express';
const router = express.Router();
import {
  createAmbulance,
  getAmbulances,
  getAmbulanceById,
  updateAmbulance,
  deleteAmbulance,
  sendEmail,
  updateAmbulanceAvailability,
  
} from '../controllers/ambulanceController.js';

// Route to create a new ambulance (POST)
router.route('/').post(createAmbulance);

// Route to get all ambulances (GET)
router.route('/').get(getAmbulances);

// Route to get a specific ambulance by ID (GET)
// Route to update an ambulance (PUT)
// Route to delete an ambulance (DELETE)
router
  .route('/:id')
  .get(getAmbulanceById)
  .put(updateAmbulance)
  .delete(deleteAmbulance);


  router.post('/send-email', sendEmail);

  router.route('/:id').put(updateAmbulanceAvailability);




export default router;
