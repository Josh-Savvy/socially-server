import { UserService } from "./user.service";
import { JwtUser } from "../auth/guards/auth.guard";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(req: Request & {
        user: JwtUser;
    }): Promise<JwtUser>;
}
