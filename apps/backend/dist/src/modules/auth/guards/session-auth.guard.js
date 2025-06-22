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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/service/user.service");
const session_service_1 = require("../session.service");
let SessionAuthGuard = class SessionAuthGuard {
    constructor(sessionService, usersService) {
        this.sessionService = sessionService;
        this.usersService = usersService;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const sessionId = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.sessionId;
        if (!sessionId) {
            throw new common_1.UnauthorizedException('세션이 없습니다.');
        }
        const userId = await this.sessionService.validateSession(sessionId);
        if (!userId) {
            throw new common_1.UnauthorizedException('유효하지 않은 세션입니다.');
        }
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('사용자를 찾을 수 없습니다.');
        }
        request.user = user;
        return true;
    }
};
exports.SessionAuthGuard = SessionAuthGuard;
exports.SessionAuthGuard = SessionAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        user_service_1.UsersService])
], SessionAuthGuard);
//# sourceMappingURL=session-auth.guard.js.map