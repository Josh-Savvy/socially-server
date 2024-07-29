import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard, JwtUser } from "../auth/guards/auth.guard";

@Controller({ version: "1", path: "user" })
@UseGuards(AuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get()
	async profile(@Req() req: Request & { user: JwtUser }) {
		return req?.user;
	}
}
