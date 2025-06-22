"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const nestjs_dynamoose_1 = require("nestjs-dynamoose");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const session_schema_1 = require("./schema/session.schema");
const session_service_1 = require("./session.service");
const github_strategy_1 = require("./strategies/github.strategy");
const google_strategy_1 = require("./strategies/google.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UsersModule,
            passport_1.PassportModule,
            nestjs_dynamoose_1.DynamooseModule.forFeature([
                {
                    name: 'session',
                    schema: session_schema_1.SessionSchema,
                },
            ]),
        ],
        providers: [
            auth_service_1.AuthService,
            session_service_1.SessionService,
            local_strategy_1.LocalStrategy,
            google_strategy_1.GoogleStrategy,
            github_strategy_1.GithubStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map