import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDto } from "../auth/dto/auth.dto";
import { faker } from "@faker-js/faker";
import ErrorHandler from "src/helpers/error-handler";
import PasswordManagementService from "../auth/services/password-management.service";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepo: Repository<User>,
	) {}

	async create(payload: SignUpDto) {
		try {
			return await this.userRepo.save({
				...payload,
				encrypted_password: await PasswordManagementService.encryptPassword(payload.password),
				username: `${payload.first_name}${payload.last_name}${faker.number.bigInt({ max: 1000000 })}`,
			});
		} catch (error) {
			throw error;
		}
	}

	static async logActivity() {
		//
		return {};
	}
}
