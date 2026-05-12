"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const aiAgentScheduler_1 = require("./services/aiAgentScheduler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const aiAgentScheduler = new aiAgentScheduler_1.AIAgentScheduler();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'StratLP Backend is running smoothly',
    });
});
// API Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'StratLP Backend API is running smoothly',
        services: {
            aiAgent: aiAgentScheduler.getStatus().isRunning,
            ollama: true,
            lpAgent: true
        }
    });
});
const strategyRoutes_1 = __importDefault(require("./routes/strategyRoutes"));
const executionRoutes_1 = __importDefault(require("./routes/executionRoutes"));
app.use('/api/strategies', strategyRoutes_1.default);
app.use('/api/execution', executionRoutes_1.default);
// AI Agent Management Endpoints
app.get('/api/ai-agent/status', (req, res) => {
    const status = aiAgentScheduler.getStatus();
    res.status(200).json({
        success: true,
        data: status,
        message: 'AI Agent status retrieved successfully',
    });
});
app.post('/api/ai-agent/start', (req, res) => {
    aiAgentScheduler.start();
    res.status(200).json({
        success: true,
        message: 'AI Agent started successfully',
    });
});
app.post('/api/ai-agent/stop', (req, res) => {
    aiAgentScheduler.stop();
    res.status(200).json({
        success: true,
        message: 'AI Agent stopped successfully',
    });
});
// AI Agent Monitoring Endpoint
app.get('/api/ai-agent/monitoring', (req, res) => {
    const status = aiAgentScheduler.getStatus();
    res.status(200).json({
        success: true,
        data: {
            isMonitoring: status.isRunning,
            lastCheck: status.lastCheck,
            strategiesChecked: 3, // Default number of strategies
            uptime: status.uptime,
            nextCheck: new Date(Date.now() + 60000).toISOString() // Next check in 1 minute
        },
        message: 'AI Agent monitoring status retrieved successfully',
    });
});
// LP Agent API Endpoints
const lpAgentService_1 = require("./services/lpAgentService");
const lpAgentService = new lpAgentService_1.LPAgentService();
app.get('/api/lp-agent/pools', async (req, res) => {
    try {
        // Return sample pool data for demo
        const pools = [
            {
                poolId: '5hbf9JP8k5zdrZp9pokPypFQoBse5mGCmW6nqodurGcd',
                apy: 18.5,
                tvl: 2500000,
                volume24h: 150000,
                currentPrice: 98.50,
                volatility30m: 2.3
            },
            {
                poolId: '2DeF1QHAQMpNXCGjcsm2pWw1V4KknGtwd2wEh2fTriKC',
                apy: 22.8,
                tvl: 1800000,
                volume24h: 120000,
                currentPrice: 145.20,
                volatility30m: 3.1
            }
        ];
        res.status(200).json({
            success: true,
            data: pools,
            message: 'LP Agent pools retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to retrieve LP Agent pools',
        });
    }
});
app.get('/api/lp-agent/positions/:owner', async (req, res) => {
    try {
        const { owner } = req.params;
        const portfolio = await lpAgentService.getPortfolio(owner);
        res.status(200).json({
            success: true,
            data: portfolio,
            message: 'LP positions retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to retrieve LP positions',
        });
    }
});
// Start AI Agent automatically when server starts
setTimeout(() => {
    console.log('[App] 🤖 Auto-starting AI Agent...');
    aiAgentScheduler.start();
}, 2000); // Wait 2 seconds for strategies to be seeded
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
});
exports.default = app;
