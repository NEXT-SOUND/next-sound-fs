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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const uuid = __importStar(require("uuid"));
const common_1 = require("@nestjs/common");
const notification_enum_1 = require("../model/notification.enum");
let NotificationService = class NotificationService {
    constructor(model) {
        this.model = model;
    }
    create(input) {
        return this.model.create(Object.assign(Object.assign({}, input), { id: uuid.v4(), status: notification_enum_1.NotificationStatus.Active, createAt: new Date().toISOString() }));
    }
    update(key, input) {
        return this.model.update(key, input);
    }
    delete(key) {
        return this.model.delete(key);
    }
    findOne(key) {
        return this.model.get(key);
    }
    findByTargetId(targetId) {
        return this.model
            .query('targetId')
            .eq(targetId)
            .where('status')
            .eq(notification_enum_1.NotificationStatus.Active)
            .exec();
    }
    findByUserId(userId) {
        return this.model
            .query('userId')
            .eq(userId)
            .where('status')
            .eq(notification_enum_1.NotificationStatus.Active)
            .exec();
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_dynamoose_1.InjectModel)('notification')),
    __metadata("design:paramtypes", [Object])
], NotificationService);
//# sourceMappingURL=notification.service.js.map