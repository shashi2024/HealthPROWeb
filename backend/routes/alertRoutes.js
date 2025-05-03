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

router.put('/alerts/:id/important', async (req, res) => {
  const { id } = req.params;
  const { isImportant } = req.body;

  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      id,
      { important: isImportant },
      { new: true }
    );

    if (!updatedAlert) return res.status(404).json({ error: "Alert not found." });

    res.json(updatedAlert);
  } catch (err) {
    res.status(500).json({ error: "Failed to update alert." });
  }
});

export default router;
