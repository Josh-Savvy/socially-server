import { HttpStatus } from "@nestjs/common";
import { SignUpDto, SignInDto } from "./dto/auth.dto";
import AuthService from "./services/auth.service";
import OtpService from "./services/otp.service";
export declare class AuthController {
    private readonly authService;
    private readonly otpService;
    constructor(authService: AuthService, otpService: OtpService);
    sendIdentityVerification(body: {
        email: string;
    }): Promise<{
        expiry: Date;
        message: string;
    }>;
    confirmIdentity(body: {
        email: string;
        otp: string;
    }): Promise<{
        message: string;
        status: HttpStatus;
    }>;
    signup(input: SignUpDto): Promise<{
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
        } & import("../user/entities/user.entity").User;
    }>;
    signin(input: SignInDto): Promise<{
        user: import("../user/entities/user.entity").User;
        access_token: string;
    }>;
}
