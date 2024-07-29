"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigninValidationPipe = exports.SignupValidationPipe = exports.signupSchema = exports.SignUpDto = void 0;
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
}).options({ abortEarly: false, allowUnknown: true });
class SignupValidationPipe extends validation_pipe_1.default {
    constructor() {
        super(exports.signupSchema);
    }
}
exports.SignupValidationPipe = SignupValidationPipe;
class SigninValidationPipe extends validation_pipe_1.default {
    constructor() {
        super(Joi.object({
            email: schema_1.emailValidationSchema.required(),
            password: schema_1.passwordSchema.required(),
        }).options({ abortEarly: false, allowUnknown: true }));
    }
}
exports.SigninValidationPipe = SigninValidationPipe;
//# sourceMappingURL=sign-up.dto.js.map