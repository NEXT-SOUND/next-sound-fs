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
exports.UpdateController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const openai_service_1 = require("../service/openai.service");
let UpdateController = class UpdateController {
    constructor(openAIService) {
        this.openAIService = openAIService;
    }
    async processFileAndQuestion(file, question) {
        const fileContent = file ? file.buffer.toString() : '';
        return this.openAIService.processFileAndQuestion(fileContent, question);
    }
    async processQuestion(question) {
        return this.openAIService.processQuestion(question);
    }
    async createAssistant(name, instructions) {
        return this.openAIService.createAssistant(name, instructions);
    }
    async createThread() {
        return this.openAIService.createThread();
    }
    async addMessage(threadId, content, fileIds) {
        return this.openAIService.addMessageToThread(threadId, content, fileIds);
    }
    async runThread(threadId, assistantId) {
        return this.openAIService.runThread(threadId, assistantId);
    }
    async getThreadMessages(threadId) {
        return this.openAIService.getThreadMessages(threadId);
    }
    async uploadFile(file) {
        return this.openAIService.uploadFile(file.buffer);
    }
};
exports.UpdateController = UpdateController;
__decorate([
    (0, common_1.Post)('process'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('question')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "processFileAndQuestion", null);
__decorate([
    (0, common_1.Post)('question'),
    __param(0, (0, common_1.Body)('question')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "processQuestion", null);
__decorate([
    (0, common_1.Post)('assistant'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('instructions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "createAssistant", null);
__decorate([
    (0, common_1.Post)('thread'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "createThread", null);
__decorate([
    (0, common_1.Post)('thread/:threadId/message'),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Body)('fileIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "addMessage", null);
__decorate([
    (0, common_1.Post)('thread/:threadId/run'),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Body)('assistantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "runThread", null);
__decorate([
    (0, common_1.Get)('thread/:threadId/messages'),
    __param(0, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "getThreadMessages", null);
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UpdateController.prototype, "uploadFile", null);
exports.UpdateController = UpdateController = __decorate([
    (0, common_1.Controller)('input'),
    __metadata("design:paramtypes", [openai_service_1.OpenAIService])
], UpdateController);
//# sourceMappingURL=update.controller.js.map