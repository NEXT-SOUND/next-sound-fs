"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.auth = exports.handlerSocket = exports.disconnect = exports.connect = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const AWS = __importStar(require("aws-sdk"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
let cachedServer;
const bootstrapServer = async () => {
    const expressApp = (0, express_1.default)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.useGlobalPipes(new common_1.ValidationPipe({ forbidUnknownValues: true }));
    expressApp.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
    await app.init();
    return (0, serverless_express_1.default)({
        app: expressApp,
    });
};
const connect = async (_event, _context, _callback) => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
    catch (error) {
        console.error('Connection error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }
};
exports.connect = connect;
const disconnect = async (_event, _context, _callback) => {
    return {
        statusCode: 200,
        body: 'Disconnected.',
    };
};
exports.disconnect = disconnect;
const handlerSocket = async (event, _context) => {
    const client = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: `https://${event.requestContext.domainName}/${event.requestContext.stage}`,
    });
    try {
        await client
            .postToConnection({
            ConnectionId: event.requestContext.connectionId,
            Data: `default route received: ${event.body}`,
        })
            .promise();
        return {
            statusCode: 200,
            body: 'Sent.',
        };
    }
    catch (error) {
        console.error('Error sending message:', error);
        return {
            statusCode: 500,
            body: 'Error sending message',
        };
    }
};
exports.handlerSocket = handlerSocket;
const auth = async (event, _context) => {
    console.log(event);
    const res = {
        principalId: 'user',
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: event.methodArn,
                },
            ],
        },
    };
    return res;
};
exports.auth = auth;
const handler = async (event, context, callback) => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    return cachedServer(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=index.js.map