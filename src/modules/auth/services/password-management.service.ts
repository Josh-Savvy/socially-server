import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export default class PasswordManagementService {
	constructor() {
		//
	}

	/**
	 * Encrypts a password using bcrypt.
	 * @param {string} password - The password to encrypt.
	 * @returns {Promise<string>} A promise that resolves to the hashed password.
	 */
	static async encryptPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hashSync(password, salt);
	}

	/**
	 * Validates a password against its encrypted version using bcrypt.
	 * @param {string} encrypted - The encrypted password.
	 * @param {string} value - The plain text password to validate.
	 * @returns {boolean} True if the plain text password matches the encrypted password, false otherwise.
	 */
	static async isValidPassword(encrypted: string, value: string): Promise<boolean> {
		return bcrypt.compareSync(encrypted, value);
	}
}
