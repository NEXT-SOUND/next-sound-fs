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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/service/user.service");
const email_verification_required_exception_1 = require("./exceptions/email-verification-required.exception");
const session_service_1 = require("./session.service");
let AuthService = class AuthService {
    constructor(usersService, sessionService, configService) {
        this.usersService = usersService;
        this.sessionService = sessionService;
        this.configService = configService;
        this.RESEND_COOLDOWN = 3 * 60 * 1000;
        this.sesClient = new client_ses_1.SESClient({
            region: this.configService.get('REGION'),
        });
    }
    async sendVerificationEmail(email, verificationToken) {
        const verificationLink = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${verificationToken}`;
        const sourceEmail = this.configService.get('SMTP_FROM');
        const params = {
            Source: `Second Brain <${sourceEmail}>`,
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Subject: {
                    Data: '🧠 Second Brain - 이메일 인증',
                    Charset: 'UTF-8',
                },
                Body: {
                    Html: {
                        Data: `
              <div style="text-align: center; padding: 20px;">
                <h1 style="color: #333;">✉️ 이메일 인증</h1>
                <p style="color: #666; font-size: 16px;">아래 링크를 클릭하여 이메일을 인증해주세요:</p>
                <p style="color: #ff4444; font-size: 14px;">⚠️ 이 링크는 5분 후에 만료됩니다.</p>
                <a href="${verificationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 20px;">이메일 인증하기</a>
              </div>
            `,
                        Charset: 'UTF-8',
                    },
                },
            },
        };
        try {
            await this.sesClient.send(new client_ses_1.SendEmailCommand(params));
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('이메일 전송에 실패했습니다.');
        }
    }
    async resendVerificationEmail(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.InternalServerErrorException('존재하지 않는 이메일입니다.');
        }
        if (user.isEmailVerified) {
            throw new common_1.InternalServerErrorException('이미 인증된 이메일입니다.');
        }
        if (user.verificationTokenExpiresAt) {
            const timeSinceLastSent = Date.now() -
                new Date(user.verificationTokenExpiresAt).getTime() +
                5 * 60 * 1000;
            if (timeSinceLastSent < this.RESEND_COOLDOWN) {
                const remainingTime = Math.ceil((this.RESEND_COOLDOWN - timeSinceLastSent) / 1000);
                throw new common_1.InternalServerErrorException(`잠시 후 다시 시도해주세요. (${remainingTime}초 남음)`);
            }
        }
        const verificationToken = (0, uuid_1.v4)();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.sendVerificationEmail(email, verificationToken);
        await this.usersService.updateVerificationToken(user.id, verificationToken, expiresAt);
        return { message: '인증 이메일이 재전송되었습니다.' };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && user.password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                if (!user.isEmailVerified) {
                    throw new email_verification_required_exception_1.EmailVerificationRequiredException();
                }
                delete user.password;
                return user;
            }
        }
        return null;
    }
    async login(user, response) {
        const sessionId = await this.sessionService.createSession(user.id);
        if (response) {
            response.cookie('sessionId', sessionId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 24 * 60 * 60 * 1000,
            });
        }
        return {
            user,
        };
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.InternalServerErrorException('이미 존재하는 이메일입니다.');
        }
        const verificationToken = (0, uuid_1.v4)();
        const user = await this.usersService.create(Object.assign(Object.assign({}, registerDto), { provider: 'local' }));
        await this.sendVerificationEmail(registerDto.email, verificationToken);
        await this.usersService.updateVerificationToken(user.id, verificationToken, new Date(Date.now() + 5 * 60 * 1000));
        return { message: '회원가입이 완료되었습니다. 이메일을 확인해주세요.' };
    }
    async verifyEmail(token) {
        const users = await this.usersService.findByVerificationToken(token);
        if (!users || users.length === 0) {
            throw new common_1.InternalServerErrorException('유효하지 않은 토큰입니다.');
        }
        const user = users[0];
        if (user.verificationTokenExpiresAt &&
            new Date() > new Date(user.verificationTokenExpiresAt)) {
            throw new common_1.InternalServerErrorException('인증 링크가 만료되었습니다. 새로운 인증 이메일을 요청해주세요.');
        }
        await this.usersService.updateVerificationStatus(user.id, true);
        await this.usersService.updateVerificationToken(user.id, undefined, undefined);
        return { message: '이메일 인증이 완료되었습니다.' };
    }
    async handleOAuthLogin(profile, provider, response, accessToken, refreshToken) {
        let user = await this.usersService.findByProviderId(profile.id);
        if (!user) {
            user = await this.usersService.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                provider,
                providerId: profile.id,
                accessToken,
                refreshToken,
            });
        }
        else {
            await this.usersService.updateTokens(user.id, accessToken, refreshToken);
        }
        delete user.password;
        return this.login(user, response);
    }
    async logout(response) {
        var _a;
        const sessionId = (_a = response.req.cookies) === null || _a === void 0 ? void 0 : _a.sessionId;
        if (sessionId) {
            await this.sessionService.deleteSession(sessionId);
        }
        response.clearCookie('sessionId');
        return { message: '로그아웃이 완료되었습니다.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        session_service_1.SessionService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map