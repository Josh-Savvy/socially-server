import { Injectable } from "@nestjs/common";

@Injectable()
export default class MailService {
	async send(input: { email: string | string[]; message: string }) {
		console.log({ input });
	}
}
