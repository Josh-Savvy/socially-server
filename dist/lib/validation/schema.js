"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.futureDateSchema = exports.phoneNumberSchema = exports.jobTitleSchema = exports.bioSchema = exports.genderSchema = exports.otpSchema = exports.passwordSchema = exports.firstNameSchema = exports.lastNameSchema = exports.emailValidationSchema = void 0;
const Joi = require("joi");
exports.emailValidationSchema = Joi.string().trim().email().messages({
    "string.trim": "email is required",
    "string.required": "email is required",
    "string.not_empty": "email is required",
    "string.base": "email is required",
    "string.email": "Please enter a valid email",
});
exports.lastNameSchema = Joi.string().trim().messages({
    "string.trim": "last name is required",
    "string.required": "last name is required",
    "string.not_empty": "last name is required",
    "string.base": "last name is required",
});
exports.firstNameSchema = Joi.string().trim().required().messages({
    "string.trim": "first name is required",
    "string.required": "first name is required",
    "string.not_empty": "first name is required",
    "string.base": "first name is required",
});
exports.passwordSchema = Joi.string().trim().min(6).messages({
    "string.trim": "password is required",
    "string.required": "password is required",
    "string.not_empty": "password is required",
    "string.min": "password must be at least 6 characters long",
    "string.base": "password is required",
});
exports.otpSchema = Joi.string().trim().length(6).messages({
    "string.trim": "otp is required",
    "string.required": "otp is required",
    "string.not_empty": "otp is required",
    "string.length": "otp must be at least 6 characters long",
    "string.base": "otp is required",
});
exports.genderSchema = Joi.string().trim().valid("male", "female", "other").messages({
    "string.trim": "gender is required",
    "string.required": "gender is required",
    "string.not_empty": "gender is required",
    "any.only": "gender must be either 'male', 'female', or 'other'",
    "string.base": "gender is required",
});
exports.bioSchema = Joi.string().trim().messages({
    "string.trim": "bio is required",
    "string.required": "bio is required",
    "string.not_empty": "bio is required",
    "string.base": "bio is required",
});
exports.jobTitleSchema = Joi.string().trim().messages({
    "string.trim": "jobTitle is required",
    "string.required": "jobTitle is required",
    "string.not_empty": "jobTitle is required",
    "string.base": "jobTitle is required",
});
exports.phoneNumberSchema = Joi.string().trim().optional().messages({
    "string.required": "phone number is required",
    "string.not_empty": "phone number is required",
    "string.base": "phone number is required",
});
exports.futureDateSchema = Joi.string()
    .trim()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
    "string.pattern.base": "due date must be a valid format of DD-MM-YYYY",
    "string.required": "due date is required",
    "string.not_empty": "due date is required",
    "string.base": "due date is required",
});
//# sourceMappingURL=schema.js.map