"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyServiceInstance = void 0;
const strategyService_1 = require("./strategyService");
// Singleton instance to ensure all controllers use the same StrategyService
exports.strategyServiceInstance = new strategyService_1.StrategyService();
