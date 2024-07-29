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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./dto/auth.dto");
const auth_guard_1 = require("./guards/auth.guard");
const auth_service_1 = require("./services/auth.service");
const otp_service_1 = require("./services/otp.service");
const error_handler_1 = require("../../helpers/error-handler");
let AuthController = class AuthController {
    constructor(authService, otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }
    async sendIdentityVerification(body) {
        try {
            return await this.otpService.sendOtp({ identifier: body.email, type: "email" });
        }
        catch (error) {
            throw error_handler_1.default.handleError("UnprocessableEntityException", error, new Error());
        }
    }
    async confirmIdentity(body) {
        try {
            const valid = await this.otpService.verifyOtp({
                identifier: body.email,
                value: body.otp,
                type: "email",
            });
            if (!valid)
                throw error_handler_1.default.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
            return { message: "Identity confirmed successfully", status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw error_handler_1.default.handleError("UnprocessableEntityException", error, new Error());
        }
    }
    async signup(input) {
        return await this.authService.signup(input);
    }
    async signin(input) {
        return await this.authService.signin(input);
    }
    async profile(req) {
        return req?.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("/send-identity-verification"),
    (0, common_1.UsePipes)(new auth_dto_1.IdentityVerificationPipe()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendIdentityVerification", null);
__decorate([
    (0, common_1.Post)("/confirm-identity"),
    (0, common_1.UsePipes)(new auth_dto_1.ConfirmIdentityPipe()),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmIdentity", null);
__decorate([
    (0, common_1.Post)("/signup"),
    (0, common_1.UsePipes)(new auth_dto_1.SignupValidationPipe()),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("signin"),
    (0, common_1.UsePipes)(new auth_dto_1.SigninValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)({ path: "auth", version: "1" }),
    __metadata("design:paramtypes", [auth_service_1.default,
        otp_service_1.default])
], AuthController);
//# sourceMappingURL=auth.controller.js.map