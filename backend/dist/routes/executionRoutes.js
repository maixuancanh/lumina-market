"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const executionController_1 = __importDefault(require("../controllers/executionController"));
const router = (0, express_1.Router)();
/**
 * Trigger the AI execution agent to evaluate a strategy and execute actions.
 * POST /api/execution/run
 * Body: { strategyId: string, userAddress: string }
 */
router.post('/run', (req, res) => executionController_1.default.runStrategy(req, res));
exports.default = router;
