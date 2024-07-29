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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificaionsController = void 0;
const common_1 = require("@nestjs/common");
const notificaions_service_1 = require("./notificaions.service");
const create_notificaion_dto_1 = require("./dto/create-notificaion.dto");
const update_notificaion_dto_1 = require("./dto/update-notificaion.dto");
let NotificaionsController = class NotificaionsController {
    constructor(notificaionsService) {
        this.notificaionsService = notificaionsService;
    }
    create(createNotificaionDto) {
        return this.notificaionsService.create(createNotificaionDto);
    }
    findAll() {
        return this.notificaionsService.findAll();
    }
    findOne(id) {
        return this.notificaionsService.findOne(+id);
    }
    update(id, updateNotificaionDto) {
        return this.notificaionsService.update(+id, updateNotificaionDto);
    }
    remove(id) {
        return this.notificaionsService.remove(+id);
    }
};
exports.NotificaionsController = NotificaionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notificaion_dto_1.CreateNotificaionDto]),
    __metadata("design:returntype", void 0)
], NotificaionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificaionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificaionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notificaion_dto_1.UpdateNotificaionDto]),
    __metadata("design:returntype", void 0)
], NotificaionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificaionsController.prototype, "remove", null);
exports.NotificaionsController = NotificaionsController = __decorate([
    (0, common_1.Controller)('notificaions'),
    __metadata("design:paramtypes", [notificaions_service_1.NotificaionsService])
], NotificaionsController);
//# sourceMappingURL=notificaions.controller.js.map