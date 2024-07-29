import { Injectable } from "@nestjs/common";
import { SignInDto, SignUpDto } from "../dto/auth.dto";
import { UserService } from "src/modules/user/user.service";
import ErrorHandler from "src/helpers/error-handler";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtConfig } from "src/config/jwt.config";

@Injectable()
export default class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService<JwtConfig>,
	) {}

	async signup(payload: SignUpDto) {
		try {
			// Todo: check if email is verified
			const user = await this.userService.create({ ...payload });
			delete user.encrypted_password;
			delete (user as any).password;
			const access_token = this.jwtService.sign(
				{ id: user.id, email: user.email },
				{ secret: this.configService.get("secret") },
			);
			return { access_token, user };
		} catch (error) {
			if (error.code == "23505")
				throw ErrorHandler.handleError("BadRequestException", {
					message: "Sorry, this email has already been used.",
				});
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error(error.message));
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
