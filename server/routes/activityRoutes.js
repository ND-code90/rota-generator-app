import express from "express";
const router = express.Router();

import {    
    getAllActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    } from "../controllers/activityController.js";

router.get("/", getAllActivities);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;