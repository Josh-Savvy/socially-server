import { HttpStatus } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dto/auth.dto";
import { UserService } from "src/modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtConfig } from "src/config/jwt.config";
import { Cache } from "cache-manager";
import OtpService from "./otp.service";
export default class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly otpService;
    private readonly configService;
    private readonly cache;
    constructor(userService: UserService, jwtService: JwtService, otpService: OtpService, configService: ConfigService<JwtConfig>, cache: Cache);
    sendVerification(payload: {
        email: string;
    }): Promise<{
        expiry: Date;
        message: string;
    }>;
    confirmVerification(payload: {
        otp: string;
        email: string;
    }): Promise<{
        message: string;
        status: HttpStatus;
    }>;
    signup(payload: SignUpDto): Promise<{
        access_token: string;
        user: {
            encrypted_password: string;
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            password: string;
            gender: string;
            job_title?: string;
            bio?: string;
        } & import("../../user/entities/user.entity").User;
    }>;
    signin(payload: SignInDto): Promise<{
        user: import("../../user/entities/user.entity").User;
        access_token: string;
    }>;
    profile(): Promise<void>;
}
