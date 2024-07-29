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
var ErrorHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Exceptions = require("@nestjs/common/exceptions");
let ErrorHandler = ErrorHandler_1 = class ErrorHandler {
    constructor() {
        this.logger = new common_1.Logger();
    }
    static handleError(type, error, ...args) {
        const logger = new common_1.Logger(ErrorHandler_1.name);
        logger.error(error, ...args);
        const [errorType, rest] = type.split("Exception");
        console.log({ error });
        let exception = new Exceptions[type]({ error: errorType || "", message: error.message, status: error.code || error.statusCode || error.status }, args);
        let response = exception.getResponse();
        response.status = exception?.status;
        return exception;
    }
    handleError(type, error, ...args) {
        this.logger.error(error, ...args);
        const [errorType, rest] = type.split("Exception");
        console.log({ error });
        let exception = new Exceptions[type]({ error: errorType || "", message: error.message, status: error.code || error.statusCode || error.status }, args);
        let response = exception.getResponse();
        response.status = exception?.status;
        return exception;
    }
};
ErrorHandler = ErrorHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ErrorHandler);
exports.default = ErrorHandler;
//# sourceMappingURL=error-handler.js.map