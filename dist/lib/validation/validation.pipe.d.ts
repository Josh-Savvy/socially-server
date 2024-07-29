import * as Joi from "joi";
import { PipeTransform } from "@nestjs/common";
export default class ValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: Joi.Schema);
    transform<T>(value: T): any;
}
