import { Injectable } from "@nestjs/common";
import ErrorHandler from "src/helpers/error-handler";
import { emailValidationSchema, otpSchema } from "src/lib/validation/schema";
import { Auth } from "../entities/auth.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { isPast } from "date-fns";
import SmsService from "src/services/sms.service";
import MailService from "src/services/mail.service";
import { VerificationChannel } from "src/interfaces";

@Injectable()
export default class OtpService {
	constructor(
		@InjectRepository(Auth)
		private readonly authRepo: Repository<Auth>,
		private readonly smsService: SmsService,
		private readonly mailService: MailService,
	) {}

	static generateOtp() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	async sendOtp(input: { identifier: string; type?: VerificationChannel }) {
		const { identifier, type } = input;
		try {
			let auth = await this.authRepo.findOne({ where: { identifier, type } });
			if (!auth) auth = this.authRepo.create({ identifier, type, otp: OtpService.generateOtp() });
			const currentDate = new Date();
			currentDate.setMinutes(currentDate.getMinutes() + 30); // Expiry time is 30 minutes from currentDate
			auth.expiry = currentDate;
			if (type === "sms") await this.smsService.sendSms(auth.identifier);
			else if (type === "email") await this.mailService.send({ email: identifier, message: "" });
			await this.authRepo.save(auth)
			return { otp: auth.otp, expiry: auth.expiry, message: `OTP sent successfully to ${identifier}` };
		} catch (error) {
			throw ErrorHandler.handleError("UnprocessableEntityException", error, new Error(error.message));
		}
	}

	async verifyOtp(input: { type?: "email" | "sms"; identifier: string; value: string }) {
		const { identifier, value, type } = input;
		const { error, value: otp } = otpSchema.validate(value);
		if (error)
			throw ErrorHandler.handleError("BadRequestException", {
				message: error.details[0]?.message.split('"').join(""),
			});
		if (type == "email") {
			const { error } = emailValidationSchema.validate(identifier);
			if (error)
				throw ErrorHandler.handleError("BadRequestException", {
					message: error.details[0]?.message.split('"').join(""),
				});
		}

		const auth = await this.authRepo.findOne({ where: { identifier, type, otp } });
		if (!auth) throw ErrorHandler.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
		if (isPast(new Date(auth.expiry)))
			throw ErrorHandler.handleError("BadRequestException", { message: "Invalid or Expired OTP" });
	}
}
