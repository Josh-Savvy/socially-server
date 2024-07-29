import * as Joi from "joi";
import ValidationPipe from "src/lib/validation/validation.pipe";
export declare class SignUpDto {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
    job_title?: string;
    bio?: string;
}
export type SignInDto = Pick<SignUpDto, "email" | "password">;
export declare const signupSchema: Joi.ObjectSchema<SignUpDto>;
export declare class IdentityVerificationPipe extends ValidationPipe {
    constructor();
}
export declare class ConfirmIdentityPipe extends ValidationPipe {
    constructor();
}
export declare class SignupValidationPipe extends ValidationPipe {
    constructor();
}
export declare class SigninValidationPipe extends ValidationPipe {
    constructor();
}
