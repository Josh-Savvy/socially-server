import * as Joi from "joi";
import { PipeTransform, Injectable } from "@nestjs/common";
import ErrorHandler from "src/helpers/error-handler";

@Injectable()
export default class ValidationPipe implements PipeTransform {
	constructor(private schema: Joi.Schema) {}

	transform<T>(value: T) {
		const { error, value: validatedValue } = this.schema.validate(value, {
			abortEarly: false,
		});
		if (error) {
			const errorMessage = error.details[0]?.message;
			if (!errorMessage)
				throw ErrorHandler.handleError("UnprocessableEntityException", { message: "Something went wrong" });
			throw ErrorHandler.handleError("BadRequestException", { message: errorMessage.split('"').join("") });
		}
		return validatedValue;
	}
}
