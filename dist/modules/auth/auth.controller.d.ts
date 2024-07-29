import { SignUpDto, SignInDto } from "./dto/auth.dto";
import { type JwtUser } from "./guards/auth.guard";
import { Request } from "express";
import AuthService from "./services/auth.service";
import OtpService from "./services/otp.service";
export declare class AuthController {
    private readonly authService;
    private readonly otpService;
    constructor(authService: AuthService, otpService: OtpService);
    sendIdentityVerification(body: {
        email: string;
    }): Promise<{
        otp: string;
        expiry: Date;
        message: string;
    }>;
    confirmIdentity(body: {
        email: string;
        otp: string;
    }): Promise<void>;
    signup(input: SignUpDto): Promise<string>;
    signin(input: SignInDto): Promise<{
        email: string;
        password: string;
    }>;
    profile(req: Request & {
        user: JwtUser;
    }): Promise<JwtUser>;
}
