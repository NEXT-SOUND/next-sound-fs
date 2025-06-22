"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.NotificationSchema = new dynamoose_1.Schema({
    id: {
        type: String,
        hashKey: true,
    },
    targetId: {
        type: String,
        index: {
            type: 'global',
            rangeKey: 'status',
        },
    },
    userId: {
        type: String,
        index: {
            type: 'global',
            rangeKey: 'status',
        },
    },
    content: {
        type: String,
    },
    status: {
        type: String,
    },
    createAt: {
        type: String,
    },
});
//# sourceMappingURL=notification.schema.js.map