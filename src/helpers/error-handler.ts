import { Injectable, Logger } from "@nestjs/common";
import * as Exceptions from "@nestjs/common/exceptions";

@Injectable()
export default class ErrorHandler {
	private logger: Logger;

	constructor() {
		this.logger = new Logger();
	}

	static handleError(type: keyof typeof Exceptions, error: any, ...args: any) {
		const logger = new Logger(ErrorHandler.name);
		logger.error(error, ...args);
		const [errorType, rest] = type.split("Exception");
		console.log({ error });
		let exception = new Exceptions[type](
			{ error: errorType || "", message: error.message, status: error.code || error.statusCode || error.status },
			args,
		);
		let response = exception.getResponse();
		(response as any).status = (exception as any)?.status;
		return exception;
	}

	handleError(type: keyof typeof Exceptions, error: any, ...args: any) {
		this.logger.error(error, ...args);
		const [errorType, rest] = type.split("Exception");
		console.log({ error });
		let exception = new Exceptions[type](
			{ error: errorType || "", message: error.message, status: error.code || error.statusCode || error.status },
			args,
		);
		let response = exception.getResponse();
		(response as any).status = (exception as any)?.status;
		return exception;
	}
}
