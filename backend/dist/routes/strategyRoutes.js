"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const strategyController_1 = require("../controllers/strategyController");
const router = express_1.default.Router();
/**
 * @route   POST /api/strategies/analyze
 * @desc    Translates natural language strategy description to JSON logic
 * @access  Public
 */
router.post('/analyze', strategyController_1.StrategyController.analyzeStrategy);
/**
 * @route   POST /api/strategies
 * @desc    Creates and registers a new strategy in the marketplace
 * @access  Public
 */
router.post('/', strategyController_1.StrategyController.createStrategy);
/**
 * @route   GET /api/strategies
 * @desc    Lists all available strategies for the marketplace
 * @access  Public
 */
router.get('/', strategyController_1.StrategyController.listStrategies);
/**
 * @route   GET /api/strategies/:id
 * @desc    Gets detailed information and performance for a specific strategy
 * @access  Public
 */
router.get('/:id', strategyController_1.StrategyController.getStrategy);
exports.default = router;
