import { Injectable } from "@nestjs/common";

@Injectable()
export default class SmsService {
	constructor() {}

	async sendSms(phone: string) {
		console.log("sending sms...", { phone });
		return {};
	}
}
