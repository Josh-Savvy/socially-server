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
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const error_handler_1 = require("../../../helpers/error-handler");
const otp_service_1 = require("./otp.service");
let AuthService = class AuthService {
    constructor(userService, otpService, errorHandler) {
        this.userService = userService;
        this.otpService = otpService;
        this.errorHandler = errorHandler;
    }
    async signup(payload) {
        try {
            const user = await this.userService.create({ ...payload });
            return user;
        }
        catch (error) {
            throw this.errorHandler.handleError("UnprocessableEntityException", error, new Error(error.message));
        }
    }
    async signin(payload) {
        return { ...payload };
    }
    async profile() {
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        otp_service_1.default,
        error_handler_1.default])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map