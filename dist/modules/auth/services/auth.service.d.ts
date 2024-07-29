import { SignInDto, SignUpDto } from "../dto/sign-up.dto";
export default class AuthService {
    constructor();
    signup(input: SignUpDto): Promise<{
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }>;
    signin(input: SignInDto): Promise<{
        email: string;
        password: string;
    }>;
    profile(): Promise<void>;
}
