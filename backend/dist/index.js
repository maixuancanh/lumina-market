"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4001;
async function startServer() {
    try {
        app_1.default.listen(PORT, () => {
            console.log(`🚀 StratLP Backend running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        });
    }
    catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
}
startServer();
