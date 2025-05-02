import express from "express";
import { rcreate, rgetAll, rgetOne, rupdate, rdelete, getAllRecordsWithPatient } from "../controllers/RecordController.js";

const router = express.Router();

router.post("/rcreate", rcreate);
router.get("/rgetall", rgetAll);
router.get("/rgetone/:id", rgetOne);
router.put("/rupdate/:id", rupdate);
router.delete("/rdelete/:id", rdelete);
router.get('/records-with-patient', getAllRecordsWithPatient);

export default router;
