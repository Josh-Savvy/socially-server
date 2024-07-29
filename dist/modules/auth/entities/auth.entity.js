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
exports.Auth = exports.OtpType = void 0;
const typeorm_1 = require("typeorm");
var OtpType;
(function (OtpType) {
    OtpType["email"] = "email";
    OtpType["sms"] = "sms";
})(OtpType || (exports.OtpType = OtpType = {}));
let Auth = class Auth extends typeorm_1.Repository {
};
exports.Auth = Auth;
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar"),
    __metadata("design:type", String)
], Auth.prototype, "identifier", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 6 }),
    __metadata("design:type", String)
], Auth.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: OtpType }),
    __metadata("design:type", String)
], Auth.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Auth.prototype, "expiry", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Auth.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Auth.prototype, "updatedAt", void 0);
exports.Auth = Auth = __decorate([
    (0, typeorm_1.Entity)()
], Auth);
//# sourceMappingURL=auth.entity.js.map