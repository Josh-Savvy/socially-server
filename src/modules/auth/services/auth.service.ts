import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dto/auth.dto";
import { UserService } from "src/modules/user/user.service";
import ErrorHandler from "src/helpers/error-handler";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtConfig } from "src/config/jwt.config";
import PasswordManagementService from "./password-management.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import OtpService from "./otp.service";

@Injectable()
export default class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly otpService: OtpService,
		private readonly configService: ConfigService<JwtConfig>,
		@Inject(CACHE_MANAGER)
		private readonly cache: Cache,
	) {}

	async sendVerification(payload: { email: string }) {
		try {
			if (await this.cache.get(payload.email))
				throw ErrorHandler.handleError(
					"BadRequestException",
					{ message: "Verification code already sent" },
					new Error(),
				);
			const { otp, ...data } = await this.otpService.sendOtp({ identifier: payload.email, type: "email" });
			await this.cache.set(
				payload.email,
				JSON.stringify({ isEmailVerified: false, otp, email: payload.email }),
				1800 * 1000,
			);
			return data;
		} catch (error) {
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error());
		}
	}

	async confirmVerification(payload: { otp: string; email: string }) {
		if (!(await this.cache.get(payload.email)))
			throw ErrorHandler.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
		try {
			const valid = await this.otpService.verifyOtp({
				identifier: payload.email,
				value: payload.otp,
				type: "email",
			});
			if (!valid) throw ErrorHandler.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
			await this.cache.set(
				payload.email,
				JSON.stringify({ isEmailVerified: true, email: payload.email }),
				1800 * 1000,
			);
			return { message: "Identity confirmed successfully", status: HttpStatus.OK };
		} catch (error) {
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error());
		}
	}

	async signup(payload: SignUpDto) {
		const isEmailVerifiedCache = await this.cache.get<string>(payload.email);
		const isEmailVerified = isEmailVerifiedCache ? JSON.parse(isEmailVerifiedCache) : null;
		if (!isEmailVerified || !isEmailVerified.isEmailVerified)
			throw ErrorHandler.handleError("BadGatewayException", { message: "Email not verified" });
		await this.cache.del(payload.email);
		try {
			const user = await this.userService.create({ ...payload });
			delete user.encrypted_password;
			delete (user as any).password;
			const access_token = this.jwtService.sign(
				{ id: user.id, email: user.email },
				{ secret: this.configService.get("secret") },
			);
			await this.cache.set("access_token", access_token, 84600 * 1000 * 6);
			return { access_token, user };
		} catch (error) {
			if (error.code == "23505")
				throw ErrorHandler.handleError("BadRequestException", {
					message: "Sorry, this email has already been used.",
				});
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error(error.message));
		}
	}

	async signin(payload: SignInDto) {
		const userNotFoundCache = await this.cache.get(`user_not_found_${payload.email}`);
		if (userNotFoundCache)
			throw ErrorHandler.handleError("BadRequestException", { message: "Invalid Credentials" });
		const user = await this.userService.findone({
			by: "email",
			identifier: payload.email,
			options: { relations: ["notifications", "stories"] },
		});
		if (!user) {
			await this.cache.set(`user_not_found_${payload.email}`, "User not found", 84600 * 1000);
			throw ErrorHandler.handleError("BadRequestException", { message: "Invalid Credentials" });
		}
		const isValid = await PasswordManagementService.isValidPassword(user.encrypted_password, payload.password);
		if (!isValid) throw ErrorHandler.handleError("BadRequestException", { message: "Invalid Credentials" });
		const access_token = this.jwtService.sign(
			{ id: user.id, email: user.email },
			{ secret: this.configService.get("secret") },
		);
		await this.cache.set("access_token", access_token, 84600 * 1000 * 6);
		return { user, access_token };
	}

	async profile() {
		//
	}
}
