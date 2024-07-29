import { Repository } from "typeorm";
export declare enum OtpType {
    email = "email",
    sms = "sms"
}
export declare class Auth extends Repository<Auth> {
    identifier: string;
    otp: string;
    type: string;
    expiry: Date;
    createdAt: Date;
    updatedAt: Date;
}
