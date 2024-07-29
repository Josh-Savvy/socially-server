"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OtpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const error_handler_1 = require("../../../helpers/error-handler");
const schema_1 = require("../../../lib/validation/schema");
const auth_entity_1 = require("../entities/auth.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const date_fns_1 = require("date-fns");
const sms_service_1 = require("../../../services/sms.service");
const mail_service_1 = require("../../../services/mail.service");
let OtpService = OtpService_1 = class OtpService {
    constructor(authRepo, smsService, mailService) {
        this.authRepo = authRepo;
        this.smsService = smsService;
        this.mailService = mailService;
    }
    static generateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOtp(input) {
        const { identifier, type } = input;
        try {
            let auth = await this.authRepo.findOne({ where: { identifier, type } });
            if (!auth)
                auth = this.authRepo.create({ identifier, type });
            const currentDate = new Date();
            currentDate.setMinutes(currentDate.getMinutes() + 30);
            auth.expiry = currentDate;
            auth.otp = OtpService_1.generateOtp();
            if (type === "sms")
                await this.smsService.sendSms(auth.identifier);
            else if (type === "email")
                await this.mailService.send({ email: identifier, message: "" });
            await this.authRepo.save(auth);
            return { otp: auth.otp, expiry: auth.expiry, message: `OTP sent successfully to ${identifier}` };
        }
        catch (error) {
            throw error_handler_1.default.handleError("UnprocessableEntityException", error, new Error(error.message));
        }
    }
    async verifyOtp(input) {
        const { identifier, value, type } = input;
        const { error, value: otp } = schema_1.otpSchema.validate(value);
        if (error)
            throw error_handler_1.default.handleError("BadRequestException", {
                message: error.details[0]?.message.split('"').join(""),
            });
        if (type == "email") {
            const { error } = schema_1.emailValidationSchema.validate(identifier);
            if (error)
                throw error_handler_1.default.handleError("BadRequestException", {
                    message: error.details[0]?.message.split('"').join(""),
                });
        }
        const auth = await this.authRepo.findOne({ where: { identifier, type, otp } });
        if (!auth || (0, date_fns_1.isPast)(new Date(auth.expiry)))
            return false;
        await this.authRepo.delete(auth.identifier);
        return true;
    }
};
OtpService = OtpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(auth_entity_1.Auth)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        sms_service_1.default,
        mail_service_1.default])
], OtpService);
exports.default = OtpService;
//# sourceMappingURL=otp.service.js.map