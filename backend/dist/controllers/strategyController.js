"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyController = void 0;
const strategyServiceSingleton_1 = require("../services/strategyServiceSingleton");
const ollamaService_1 = require("../services/ollamaService");
const strategyService = strategyServiceSingleton_1.strategyServiceInstance;
const ollamaService = new ollamaService_1.OllamaService();
class StrategyController {
    /**
     * Translates a natural language description into a structured strategy logic.
     * Used by the "No-code Builder" before minting.
     */
    static async analyzeStrategy(req, res) {
        try {
            const { prompt } = req.body;
            if (!prompt) {
                return res.status(400).json({ error: 'Prompt is required' });
            }
            const logic = await ollamaService.parseNaturalLanguageToStrategy(prompt);
            return res.status(200).json({
                success: true,
                data: logic,
                message: 'Strategy logic successfully parsed from natural language',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Internal Server Error during AI analysis',
            });
        }
    }
    /**
     * Creates and registers a new strategy in the marketplace.
     */
    static async createStrategy(req, res) {
        try {
            const strategyData = req.body;
            if (!strategyData.logic || !strategyData.creatorAddress) {
                return res.status(400).json({ error: 'Strategy logic and creator address are required' });
            }
            const strategy = await strategyService.createStrategy(strategyData);
            return res.status(201).json({
                success: true,
                data: strategy,
                message: 'Strategy created and registered in the marketplace',
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Internal Server Error while creating strategy',
            });
        }
    }
    /**
     * Retrieves all available strategies for the marketplace gallery.
     */
    static async listStrategies(req, res) {
        try {
            const strategies = await strategyService.listStrategies();
            return res.status(200).json({
                success: true,
                data: strategies,
                count: strategies.length,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Internal Server Error while listing strategies',
            });
        }
    }
    /**
     * Retrieves detailed information and performance for a specific strategy.
     */
    static async getStrategy(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Strategy ID is required' });
            }
            const strategy = await strategyService.getStrategy(id);
            if (!strategy) {
                return res.status(404).json({ error: 'Strategy not found' });
            }
            return res.status(200).json({
                success: true,
                data: strategy,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message || 'Internal Server Error while fetching strategy',
            });
        }
    }
}
exports.StrategyController = StrategyController;
