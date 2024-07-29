import { SignUpDto, SignInDto } from "./dto/sign-up.dto";
import { type JwtUser } from "./guards/auth.guard";
import { Request } from "express";
import AuthService from "./services/auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(input: SignInDto): Promise<{
        email: string;
        password: string;
    }>;
    signup(input: SignUpDto): Promise<{
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }>;
    profile(req: Request & {
        user: JwtUser;
    }): Promise<JwtUser>;
}
