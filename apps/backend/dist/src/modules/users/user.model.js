"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const dynamoose_1 = require("dynamoose");
const Item_1 = require("dynamoose/dist/Item");
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
    password: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
        enum: ['local', 'google', 'github'],
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
});
class User extends Item_1.Item {
}
exports.User = User;
//# sourceMappingURL=user.model.js.map