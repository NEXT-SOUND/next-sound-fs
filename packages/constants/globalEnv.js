"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GLOBAL_ENV = {
    production: {
        BACKEND_URL: "https://api.yourdomain.com",
        FRONTEND_URL: "https://next-sound-fe-web.vercel.app/",
    },
    development: {
        BACKEND_URL: "http://localhost:5024",
        FRONTEND_URL: "http://localhost:3000",
    },
}[process.env.NODE_ENV || "development"];
exports.default = GLOBAL_ENV;
//# sourceMappingURL=globalEnv.js.map