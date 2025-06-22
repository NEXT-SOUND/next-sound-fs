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
exports.UsersService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const hashedPassword = createUserDto.password
            ? await bcrypt.hash(createUserDto.password, 10)
            : undefined;
        return this.userModel.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createUserDto), { password: hashedPassword, isEmailVerified: false, createdAt: new Date(), updatedAt: new Date() }));
    }
    async findByEmail(email) {
        const users = await this.userModel.scan('email').eq(email).exec();
        return users.count > 0 ? users[0] : null;
    }
    async findById(id) {
        return this.userModel.get({ id });
    }
    async findByProviderId(providerId) {
        const users = await this.userModel.scan('providerId').eq(providerId).exec();
        return users.count > 0 ? users[0] : null;
    }
    async findByVerificationToken(token) {
        const users = await this.userModel
            .scan('verificationToken')
            .eq(token)
            .exec();
        return users;
    }
    async updateVerificationStatus(id, isVerified) {
        return this.userModel.update({ id }, {
            isEmailVerified: isVerified,
        });
    }
    async updateVerificationToken(id, verificationToken) {
        return this.userModel.update({ id }, { verificationToken });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_dynamoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map