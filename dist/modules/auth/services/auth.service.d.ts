import { SignInDto, SignUpDto } from "../dto/auth.dto";
import { UserService } from "src/modules/user/user.service";
import ErrorHandler from "src/helpers/error-handler";
import OtpService from "./otp.service";
export default class AuthService {
    private readonly userService;
    private readonly otpService;
    private errorHandler;
    constructor(userService: UserService, otpService: OtpService, errorHandler: ErrorHandler);
    signup(payload: SignUpDto): Promise<string>;
    async: any;
    signin(payload: SignInDto): Promise<{
        email: string;
        password: string;
    }>;
    profile(): Promise<void>;
}
