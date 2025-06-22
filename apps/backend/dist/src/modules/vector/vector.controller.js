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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorController = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const common_1 = require("@nestjs/common");
const vector_input_1 = require("./vector-input");
const vector_service_1 = require("./vector.service");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
let VectorController = class VectorController {
    constructor(vectorService) {
        this.vectorService = vectorService;
    }
    async embedText(body, timezone) {
        const { text, title, tags, userId } = body;
        const timestamp = (0, dayjs_1.default)().tz(timezone).unix();
        return this.vectorService.embedText(text, {
            title,
            tags,
            userId: userId.toString(),
            timestamp,
        });
    }
    async searchText(body) {
        return this.vectorService.searchText(body.query, body.userId.toString());
    }
    async askQuestion(body, timezone) {
        return this.vectorService.answerQuestion(body.query, body.userId.toString(), timezone !== null && timezone !== void 0 ? timezone : 'Asia/Seoul');
    }
};
exports.VectorController = VectorController;
__decorate([
    (0, common_1.Post)('embed-text'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-timezone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vector_input_1.VectorInputEmbed, String]),
    __metadata("design:returntype", Promise)
], VectorController.prototype, "embedText", null);
__decorate([
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vector_input_1.VectorInputFind]),
    __metadata("design:returntype", Promise)
], VectorController.prototype, "searchText", null);
__decorate([
    (0, common_1.Post)('ask'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-timezone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vector_input_1.VectorInputFind, String]),
    __metadata("design:returntype", Promise)
], VectorController.prototype, "askQuestion", null);
exports.VectorController = VectorController = __decorate([
    (0, common_1.Controller)('vector'),
    __metadata("design:paramtypes", [vector_service_1.WeaviateService])
], VectorController);
//# sourceMappingURL=vector.controller.js.map