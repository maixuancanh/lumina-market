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
