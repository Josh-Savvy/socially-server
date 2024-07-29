import { Injectable, Logger, UnprocessableEntityException } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dto/auth.dto";
import { UserService } from "src/modules/user/user.service";
import ErrorHandler from "src/helpers/error-handler";
import OtpService from "./otp.service";
import { VerificationChannel } from "src/interfaces";

@Injectable()
export default class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly otpService: OtpService,
		private errorHandler: ErrorHandler,
	) {}

	async signup(payload: SignUpDto) {
		try {
			// Todo: check if email
			const user = await this.userService.create({ ...payload });
			return user;
		} catch (error) {
			throw this.errorHandler.handleError("UnprocessableEntityException", error, new Error(error.message));
		}
	}

	async;

	async signin(payload: SignInDto) {
		return { ...payload };
	}

	async profile() {
		//
	}
}
