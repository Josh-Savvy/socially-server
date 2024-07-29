import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Cache } from "cache-manager";
import { JwtConfig } from "src/config/jwt.config";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private readonly configService;
    private userRepo;
    private readonly cache;
    constructor(jwtService: JwtService, configService: ConfigService<JwtConfig>, userRepo: Repository<User>, cache: Cache);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
export type JwtUser = Pick<User, "id" | "email">;
