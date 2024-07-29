"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninValidationPipe = exports.SignupValidationPipe = exports.ConfirmIdentityPipe = exports.IdentityVerificationPipe = exports.confirmOtpSchema = exports.sendOtpSchema = exports.signupSchema = exports.SignUpDto = void 0;
const Joi = require("joi");
const schema_1 = require("../../../lib/validation/schema");
const validation_pipe_1 = require("../../../lib/validation/validation.pipe");
class SignUpDto {
}
exports.SignUpDto = SignUpDto;
exports.signupSchema = Joi.object({
    first_name: schema_1.firstNameSchema.required(),
    last_name: schema_1.lastNameSchema.required(),
    email: schema_1.emailValidationSchema.required(),
    password: schema_1.passwordSchema.required(),
    gender: schema_1.genderSchema.required(),
    bio: schema_1.bioSchema.optional(),
    job_title: schema_1.jobTitleSchema.optional(),
}).options({ abortEarly: false, allowUnknown: true });
exports.sendOtpSchema = Joi.object({ email: schema_1.emailValidationSchema.required() }).options({
    abortEarly: false,
    allowUnknown: true,
});
exports.confirmOtpSchema = Joi.object({
    email: schema_1.emailValidationSchema.required(),
    otp: schema_1.otpSchema.required(),
}).options({
    abortEarly: false,
    allowUnknown: true,
});
class IdentityVerificationPipe extends validation_pipe_1.default {
    constructor() {
        super(exports.sendOtpSchema);
    }
}
exports.IdentityVerificationPipe = IdentityVerificationPipe;
class ConfirmIdentityPipe extends validation_pipe_1.default {
    constructor() {
        super(exports.confirmOtpSchema);
    }
}
exports.ConfirmIdentityPipe = ConfirmIdentityPipe;
class SignupValidationPipe extends validation_pipe_1.default {
    constructor() {
        super(exports.signupSchema);
    }
}
exports.SignupValidationPipe = SignupValidationPipe;
class SigninValidationPipe extends validation_pipe_1.default {
    constructor() {
        super(Joi.object({ email: schema_1.emailValidationSchema.required(), password: schema_1.passwordSchema.required() }).options({
            abortEarly: false,
            allowUnknown: true,
        }));
    }
}
exports.SigninValidationPipe = SigninValidationPipe;
//# sourceMappingURL=auth.dto.js.map