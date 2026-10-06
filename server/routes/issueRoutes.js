import { Router } from "express";
import {
  createIssue,
  deleteIssue,
  getIssues,
  updateIssue,
} from "../controllers/issueController.js";

const router = Router();

router.get("/", getIssues);
router.post("/", createIssue);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;