import express from "express";
const router = express.Router();

import {
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation,
} from "../controllers/locationController.js";

router.get("/", getAllLocations);
router.post("/", createLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;  
