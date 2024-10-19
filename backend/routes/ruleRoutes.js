import { Router } from "express";
import {
  _createRule,
  getRules,
  _combineRules,
  _evaluateRule,
} from "../controllers/ruleControllers.js";
const router = Router();

router.post("/rules", _createRule);
router.get("/rules", getRules);
router.post("/combine", _combineRules);
router.post("/evaluate", _evaluateRule);

export default router;
