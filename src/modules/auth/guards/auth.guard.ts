import { CanActivate, ExecutionContext, Global, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { JwtConfig } from "src/config/jwt.config";
import ErrorHandler from "src/helpers/error-handler";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";

@Global()
@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private readonly configService: ConfigService<JwtConfig>,
		@InjectRepository(User)
		private userRepo: Repository<User>,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) throw ErrorHandler.handleError("UnauthorizedException", { message: "Error validating auth token" });
		try {
			const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get("secret") });
			const user = payload as JwtUser;
			const userExist = await this.userRepo.findOne({
				where: [{ id: user.id }, { email: user.email }],
				relations: ["posts", "notifications", "stories", "followers"],
			});
			// Todo: cache user not found error
			if (!userExist) throw ErrorHandler.handleError("UnauthorizedException", { message: "Unauthorized" });
			delete userExist.encrypted_password;
			request["user"] = userExist;
		} catch (err) {
			console.log({ err });
			throw ErrorHandler.handleError("UnauthorizedException", err);
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}

export type JwtUser = Pick<User, "id" | "email">;
