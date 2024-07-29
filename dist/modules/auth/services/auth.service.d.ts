import { SignInDto, SignUpDto } from "../dto/auth.dto";
import { UserService } from "src/modules/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtConfig } from "src/config/jwt.config";
export default class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService<JwtConfig>);
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
    async: any;
    signin(payload: SignInDto): Promise<{
        email: string;
        password: string;
    }>;
    profile(): Promise<void>;
}
