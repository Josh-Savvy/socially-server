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
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signup(payload) {
        try {
            const user = await this.userService.create({ ...payload });
            delete user.encrypted_password;
            delete user.password;
            const access_token = this.jwtService.sign({ id: user.id, email: user.email }, { secret: this.configService.get("secret") });
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
        return { ...payload };
    }
    async profile() {
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map