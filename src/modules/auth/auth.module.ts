import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { UserModule } from "../user/user.module";
import { User } from "../user/entities/user.entity";
import PasswordManagementService from "./services/password-management.service";
import AuthService from "./services/auth.service";

@Module({
	imports: [TypeOrmModule.forFeature([Auth, User]), UserModule],
	controllers: [AuthController],
	providers: [AuthService, PasswordManagementService],
})
export class AuthModule {}
