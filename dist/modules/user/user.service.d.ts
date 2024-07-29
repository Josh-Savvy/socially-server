import { FindOneOptions, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { SignUpDto } from "../auth/dto/auth.dto";
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findone(where: {
        by: "email" | "id";
        identifier: string;
        options?: Omit<FindOneOptions<User>, "where">;
    }): Promise<User>;
    create(payload: SignUpDto): Promise<{
        encrypted_password: string;
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        gender: string;
        job_title?: string;
        bio?: string;
    } & User>;
    static logActivity(): Promise<{}>;
}
