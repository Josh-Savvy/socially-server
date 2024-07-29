"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificaionsModule = void 0;
const common_1 = require("@nestjs/common");
const notificaions_service_1 = require("./notificaions.service");
const notificaions_controller_1 = require("./notificaions.controller");
let NotificaionsModule = class NotificaionsModule {
};
exports.NotificaionsModule = NotificaionsModule;
exports.NotificaionsModule = NotificaionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [notificaions_controller_1.NotificaionsController],
        providers: [notificaions_service_1.NotificaionsService],
    })
], NotificaionsModule);
//# sourceMappingURL=notificaions.module.js.map