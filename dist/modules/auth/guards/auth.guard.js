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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const error_handler_1 = require("../../../helpers/error-handler");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let AuthGuard = class AuthGuard {
    constructor(jwtService, configService, userRepo) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userRepo = userRepo;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token)
            throw error_handler_1.default.handleError("UnauthorizedException", { message: "Error validating auth token" });
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get("secret") });
            const user = payload;
            const userExist = await this.userRepo.findOne({
                where: [{ id: user.id }, { email: user.email }],
                relations: ["posts", "notifications", "stories", "followers"],
            });
            if (!userExist)
                throw error_handler_1.default.handleError("UnauthorizedException", { message: "Unauthorized" });
            delete userExist.encrypted_password;
            request["user"] = userExist;
        }
        catch (err) {
            console.log({ err });
            throw error_handler_1.default.handleError("UnauthorizedException", err);
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map