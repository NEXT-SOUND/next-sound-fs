"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.SessionSchema = new dynamoose_1.Schema({
    sessionId: {
        type: String,
        hashKey: true,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        index: {
            name: 'userId-index',
            type: 'global',
        },
    },
    expiresAt: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
    },
});
//# sourceMappingURL=session.schema.js.map