import express from "express";

import { dcreate, ddelete, dgetAll, dgetone, dupdate,fetchSpecializations,recommendDoctors} from "../controllers/doctorController.js";


const router = express.Router();

router.post("/dcreate",dcreate);
router.get("/dgetall",dgetAll);
router.get("/dgetone/:id",dgetone);
router.put("/dupdate/:id",dupdate);
router.delete("/ddelete/:id",ddelete);

router.get('/fetchSpecializations', fetchSpecializations);
router.get('/recommendDoctors', recommendDoctors);
export default router;