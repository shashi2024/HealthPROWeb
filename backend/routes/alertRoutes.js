import express from 'express';
import {
  generateAlert,
  getAllAlerts,
  getAlertById,
  getAllAlertsdb, 
  deleteAlertGroup, 
  updateAlert
} from '../controllers/alertController.js';

import { getPandemicAlerts } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/generate', generateAlert);     // /api/alerts/generate
router.get('/', getAllAlerts);              // /api/alerts/
router.get('/:id', getAlertById);           // /api/alerts/:id

router.get('/pandemic', getPandemicAlerts); // 👈 route: /api/alerts/pandemic

router.get('/allfromdb', getAllAlertsdb);
router.delete('/group/:key', deleteAlertGroup);
router.put('/:id/update', updateAlert);

export default router;
