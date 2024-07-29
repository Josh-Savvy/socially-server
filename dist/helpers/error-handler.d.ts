import * as Exceptions from "@nestjs/common/exceptions";
export default class ErrorHandler {
    private logger;
    constructor();
    static handleError(type: keyof typeof Exceptions, error: any, ...args: any): Exceptions.HttpException;
    handleError(type: keyof typeof Exceptions, error: any, ...args: any): Exceptions.HttpException;
}
