"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.UserSchema = new dynamoose_1.Schema({
    id: {
        type: String,
        hashKey: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: {
            name: 'email-index',
            type: 'global',
        },
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'github'],
        required: true,
    },
    providerId: {
        type: String,
        required: false,
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verificationToken: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    verificationTokenExpiresAt: {
        type: Date,
        required: false,
    },
});
//# sourceMappingURL=user.schema.js.map