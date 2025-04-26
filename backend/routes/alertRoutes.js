import express from 'express';
import {
  generateAlert,
  getAllAlerts,
  getAlertById,
  generateAndSaveAlerts
} from '../controllers/alertController.js';

import { getPandemicAlerts } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/generate', generateAlert);     // /api/alerts/generate
router.get('/', getAllAlerts);              // /api/alerts/
router.get('/:id', getAlertById);           // /api/alerts/:id

router.get('/pandemic', getPandemicAlerts); // 👈 route: /api/alerts/pandemic

router.post("/save", generateAndSaveAlerts); // save generated alerts


export default router;
