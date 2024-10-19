import { Router } from "express";
import {
  createRule,
  getRules,
  combineRules,
  evaluateRule,
} from "../controllers/ruleController.js";
const router = Router();

router.post("/rules", createRule);
router.get("/rules", getRules);
router.post("/combine", combineRules);
router.post("/evaluate", evaluateRule);

export default router;
