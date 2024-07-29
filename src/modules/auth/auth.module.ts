import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { UserModule } from "../user/user.module";
import { User } from "../user/entities/user.entity";
import PasswordManagementService from "./services/password-management.service";
import AuthService from "./services/auth.service";
import { UserService } from "../user/user.service";
import ErrorHandler from "src/helpers/error-handler";
import OtpService from "./services/otp.service";
import SmsService from "src/services/sms.service";
import MailService from "src/services/mail.service";

@Module({
	imports: [TypeOrmModule.forFeature([Auth, User]), UserModule],
	controllers: [AuthController],
	providers: [AuthService, PasswordManagementService, UserService, ErrorHandler, OtpService, SmsService, MailService],
	exports: [AuthService, PasswordManagementService, OtpService],
})
export class AuthModule {}
