"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificaionsService = void 0;
const common_1 = require("@nestjs/common");
let NotificaionsService = class NotificaionsService {
    create(createNotificaionDto) {
        return 'This action adds a new notificaion';
    }
    findAll() {
        return `This action returns all notificaions`;
    }
    findOne(id) {
        return `This action returns a #${id} notificaion`;
    }
    update(id, updateNotificaionDto) {
        return `This action updates a #${id} notificaion`;
    }
    remove(id) {
        return `This action removes a #${id} notificaion`;
    }
};
exports.NotificaionsService = NotificaionsService;
exports.NotificaionsService = NotificaionsService = __decorate([
    (0, common_1.Injectable)()
], NotificaionsService);
//# sourceMappingURL=notificaions.service.js.map