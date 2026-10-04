import express from "express";
import {
  updateStaffMember,
  deleteStaffMember,
} from "../controllers/staffController.js";

const router = express.Router();

router.put("/:id", updateStaffMember);
router.delete("/:id", deleteStaffMember);

export default router;