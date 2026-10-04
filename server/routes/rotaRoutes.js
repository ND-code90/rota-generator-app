import express from "express";

const router = express.Router();

import  {
  getAllRota,
  getRotaById,
  createRota,
  updateRota,
  deleteRota,
  removeStaffFromRota,
  getAssignmentsForRota,
  createAssignment,
  assignStaffToAssignment,
} from "../controllers/rotaController.js";

router.get("/", getAllRota);
router.get("/:rotaId/assignments", getAssignmentsForRota);
router.post("/:rotaId/assignments", createAssignment);
router.put("/:rotaId/assignments/:assignmentId/staff", assignStaffToAssignment);
router.get("/:id", getRotaById);
router.post("/", createRota);
router.put("/:id", updateRota);
router.delete("/:id", deleteRota);
router.delete("/:rotaId/assignments/:assignmentId/staff", removeStaffFromRota);
export default router;