"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationRequiredException = void 0;
const common_1 = require("@nestjs/common");
class EmailVerificationRequiredException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            error: 'Email Verification Required',
            message: '이메일 인증이 필요합니다.',
            code: 'EMAIL_VERIFICATION_REQUIRED',
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.EmailVerificationRequiredException = EmailVerificationRequiredException;
//# sourceMappingURL=email-verification-required.exception.js.map