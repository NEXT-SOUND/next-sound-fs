"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_notification_input_1 = require("../model/create-notification.input");
const notification_model_1 = require("../model/notification.model");
const update_notification_input_1 = require("../model/update-notification.input");
const notification_service_1 = require("../service/notification.service");
let NotificationResolver = class NotificationResolver {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    createNotification(input) {
        return this.notificationService.create(input);
    }
    updateNotification(id, input) {
        return this.notificationService.update({ id }, input);
    }
    deleteNotification(id) {
        return this.notificationService.delete({ id });
    }
    notification(id) {
        return this.notificationService.findOne({ id });
    }
    notificationByUserId(userId) {
        return this.notificationService.findByUserId(userId);
    }
    notificationByTargetId(targetId) {
        return this.notificationService.findByTargetId(targetId);
    }
};
exports.NotificationResolver = NotificationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => notification_model_1.Notification),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_input_1.CreateNotificationInput]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "createNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_model_1.Notification),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_input_1.UpdateNotificationInput]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "updateNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_model_1.Notification),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "deleteNotification", null);
__decorate([
    (0, graphql_1.Query)(() => notification_model_1.Notification),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "notification", null);
__decorate([
    (0, graphql_1.Query)(() => [notification_model_1.Notification]),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "notificationByUserId", null);
__decorate([
    (0, graphql_1.Query)(() => [notification_model_1.Notification]),
    __param(0, (0, graphql_1.Args)('targetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationResolver.prototype, "notificationByTargetId", null);
exports.NotificationResolver = NotificationResolver = __decorate([
    (0, graphql_1.Resolver)(() => notification_model_1.Notification),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationResolver);
//# sourceMappingURL=notification.resolver.js.map