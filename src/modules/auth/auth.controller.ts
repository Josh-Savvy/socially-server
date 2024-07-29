import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import {
	SignUpDto,
	SignupValidationPipe,
	SigninValidationPipe,
	SignInDto,
	IdentityVerificationPipe,
	ConfirmIdentityPipe,
} from "./dto/auth.dto";
import { AuthGuard, type JwtUser } from "./guards/auth.guard";
import { Request } from "express";
import AuthService from "./services/auth.service";
import { VerificationChannel } from "src/interfaces";
import OtpService from "./services/otp.service";
import ErrorHandler from "src/helpers/error-handler";

@Controller({ path: "auth", version: "1" })
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly otpService: OtpService,
	) {}

	@Post("/send-identity-verification")
	@UsePipes(new IdentityVerificationPipe())
	@HttpCode(HttpStatus.OK)
	async sendIdentityVerification(@Body() body: { email: string }) {
		try {
			return await this.otpService.sendOtp({ identifier: body.email, type: "email" });
		} catch (error) {
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error());
		}
	}

	@Post("/confirm-identity")
	@UsePipes(new ConfirmIdentityPipe())
	@HttpCode(HttpStatus.OK)
	async confirmIdentity(@Body() body: { email: string; otp: string }) {
		try {
			const valid = await this.otpService.verifyOtp({
				identifier: body.email,
				value: body.otp,
				type: "email",
			});
			if (!valid) throw ErrorHandler.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
			return { message: "Identity confirmed successfully", status: HttpStatus.OK };
		} catch (error) {
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error());
		}
	}

	@Post("/signup")
	@UsePipes(new SignupValidationPipe())
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() input: SignUpDto) {
		return await this.authService.signup(input);
	}

	@Post("signin")
	@UsePipes(new SigninValidationPipe())
	async signin(@Body() input: SignInDto) {
		return await this.authService.signin(input);
	}

	@UseGuards(AuthGuard)
	@Get()
	async profile(@Req() req: Request & { user: JwtUser }) {
		return req?.user;
	}

	// Todo: forgot password
	// Todo: reset password
}
