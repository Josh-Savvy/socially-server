// &&

import * as Joi from "joi";
import {
	emailValidationSchema,
	firstNameSchema,
	lastNameSchema,
	passwordSchema,
	genderSchema,
	bioSchema,
	jobTitleSchema,
	otpSchema,
} from "src/lib/validation/schema";
import ValidationPipe from "src/lib/validation/validation.pipe";

export class SignUpDto {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	gender: string;
	job_title?: string;
	bio?: string;
}

export type SignInDto = Pick<SignUpDto, "email" | "password">;

export const signupSchema = Joi.object<SignUpDto>({
	first_name: firstNameSchema.required(),
	last_name: lastNameSchema.required(),
	email: emailValidationSchema.required(),
	password: passwordSchema.required(),
	gender: genderSchema.required(),
	bio: bioSchema.optional(),
	job_title: jobTitleSchema.optional(),
}).options({ abortEarly: false, allowUnknown: true });

export const sendOtpSchema = Joi.object<Pick<SignUpDto, "email">>({ email: emailValidationSchema.required() }).options({
	abortEarly: false,
	allowUnknown: true,
});

export const confirmOtpSchema = Joi.object<Pick<SignUpDto, "email"> & { otp: string }>({
	email: emailValidationSchema.required(),
	otp: otpSchema.required(),
}).options({
	abortEarly: false,
	allowUnknown: true,
});

export class IdentityVerificationPipe extends ValidationPipe {
	constructor() {
		super(sendOtpSchema);
	}
}

export class ConfirmIdentityPipe extends ValidationPipe {
	constructor() {
		super(confirmOtpSchema);
	}
}

export class SignupValidationPipe extends ValidationPipe {
	constructor() {
		super(signupSchema);
	}
}
export class SigninValidationPipe extends ValidationPipe {
	constructor() {
		super(
			Joi.object({ email: emailValidationSchema.required(), password: passwordSchema.required() }).options({
				abortEarly: false,
				allowUnknown: true,
			}),
		);
	}
}
