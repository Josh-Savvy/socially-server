import { Auth } from "../entities/auth.entity";
import { Repository } from "typeorm";
import SmsService from "src/services/sms.service";
import MailService from "src/services/mail.service";
import { VerificationChannel } from "src/interfaces";
export default class OtpService {
    private readonly authRepo;
    private readonly smsService;
    private readonly mailService;
    constructor(authRepo: Repository<Auth>, smsService: SmsService, mailService: MailService);
    static generateOtp(): string;
    sendOtp(input: {
        identifier: string;
        type?: VerificationChannel;
    }): Promise<{
        otp: string;
        expiry: Date;
        message: string;
    }>;
    verifyOtp(input: {
        type?: "email" | "sms";
        identifier: string;
        value: string;
    }): Promise<void>;
}
