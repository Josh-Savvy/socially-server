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
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const error_handler_1 = require("../../../helpers/error-handler");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const password_management_service_1 = require("./password-management.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const otp_service_1 = require("./otp.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, otpService, configService, cache) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.otpService = otpService;
        this.configService = configService;
        this.cache = cache;
    }
    async sendVerification(payload) {
        try {
            if (await this.cache.get(payload.email))
                throw error_handler_1.default.handleError("BadRequestException", { message: "Verification code already sent" }, new Error());
            const { otp, ...data } = await this.otpService.sendOtp({ identifier: payload.email, type: "email" });
            await this.cache.set(payload.email, JSON.stringify({ isEmailVerified: false, otp, email: payload.email }), 1800 * 1000);
            return data;
        }
        catch (error) {
            throw error_handler_1.default.handleError("UnprocessableEntityException", error, new Error());
        }
    }
    async confirmVerification(payload) {
        if (!(await this.cache.get(payload.email)))
            throw error_handler_1.default.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
        try {
            const valid = await this.otpService.verifyOtp({
                identifier: payload.email,
                value: payload.otp,
                type: "email",
            });
            if (!valid)
                throw error_handler_1.default.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
            await this.cache.set(payload.email, JSON.stringify({ isEmailVerified: true, email: payload.email }), 1800 * 1000);
            return { message: "Identity confirmed successfully", status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw error_handler_1.default.handleError("UnprocessableEntityException", error, new Error());
        }
    }
    async signup(payload) {
        const isEmailVerifiedCache = await this.cache.get(payload.email);
        const isEmailVerified = isEmailVerifiedCache ? JSON.parse(isEmailVerifiedCache) : null;
        if (!isEmailVerified || !isEmailVerified.isEmailVerified)
            throw error_handler_1.default.handleError("BadGatewayException", { message: "Email not verified" });
        await this.cache.del(payload.email);
        try {
            const user = await this.userService.create({ ...payload });
            delete user.encrypted_password;
            delete user.password;
            const access_token = this.jwtService.sign({ id: user.id, email: user.email }, { secret: this.configService.get("secret") });
            await this.cache.set("access_token", access_token, 84600 * 1000 * 6);
            return { access_token, user };
        }
        catch (error) {
            if (error.code == "23505")
                throw error_handler_1.default.handleError("BadRequestException", {
                    message: "Sorry, this email has already been used.",
                });
            throw error_handler_1.default.handleError("UnprocessableEntityException", error, new Error(error.message));
        }
    }
    async signin(payload) {
        const userNotFoundCache = await this.cache.get(`user_not_found_${payload.email}`);
        if (userNotFoundCache)
            throw error_handler_1.default.handleError("BadRequestException", { message: "Invalid Credentials" });
        const user = await this.userService.findone({
            by: "email",
            identifier: payload.email,
            options: { relations: ["notifications", "stories"] },
        });
        if (!user) {
            await this.cache.set(`user_not_found_${payload.email}`, "User not found", 84600 * 1000);
            throw error_handler_1.default.handleError("BadRequestException", { message: "Invalid Credentials" });
        }
        const isValid = await password_management_service_1.default.isValidPassword(user.encrypted_password, payload.password);
        if (!isValid)
            throw error_handler_1.default.handleError("BadRequestException", { message: "Invalid Credentials" });
        const access_token = this.jwtService.sign({ id: user.id, email: user.email }, { secret: this.configService.get("secret") });
        await this.cache.set("access_token", access_token, 84600 * 1000 * 6);
        return { user, access_token };
    }
    async profile() {
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        otp_service_1.default,
        config_1.ConfigService, Object])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map