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
exports.VectorInputEmbed = exports.VectorInputFind = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let VectorInputFind = class VectorInputFind {
};
exports.VectorInputFind = VectorInputFind;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], VectorInputFind.prototype, "query", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], VectorInputFind.prototype, "userId", void 0);
exports.VectorInputFind = VectorInputFind = __decorate([
    (0, graphql_1.InputType)(),
    (0, graphql_1.InterfaceType)('VectorInputFind')
], VectorInputFind);
let VectorInputEmbed = class VectorInputEmbed {
};
exports.VectorInputEmbed = VectorInputEmbed;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], VectorInputEmbed.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], VectorInputEmbed.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], VectorInputEmbed.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], VectorInputEmbed.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], VectorInputEmbed.prototype, "tags", void 0);
exports.VectorInputEmbed = VectorInputEmbed = __decorate([
    (0, graphql_1.InputType)(),
    (0, graphql_1.InterfaceType)('VectorInputEmbed')
], VectorInputEmbed);
//# sourceMappingURL=vector-input.js.map