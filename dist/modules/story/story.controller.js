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
exports.StoryController = void 0;
const common_1 = require("@nestjs/common");
const story_service_1 = require("./story.service");
const create_story_dto_1 = require("./dto/create-story.dto");
const update_story_dto_1 = require("./dto/update-story.dto");
let StoryController = class StoryController {
    constructor(storyService) {
        this.storyService = storyService;
    }
    create(createStoryDto) {
        return this.storyService.create(createStoryDto);
    }
    findAll() {
        return this.storyService.findAll();
    }
    findOne(id) {
        return this.storyService.findOne(+id);
    }
    update(id, updateStoryDto) {
        return this.storyService.update(+id, updateStoryDto);
    }
    remove(id) {
        return this.storyService.remove(+id);
    }
};
exports.StoryController = StoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_story_dto_1.CreateStoryDto]),
    __metadata("design:returntype", void 0)
], StoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_story_dto_1.UpdateStoryDto]),
    __metadata("design:returntype", void 0)
], StoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StoryController.prototype, "remove", null);
exports.StoryController = StoryController = __decorate([
    (0, common_1.Controller)('story'),
    __metadata("design:paramtypes", [story_service_1.StoryService])
], StoryController);
//# sourceMappingURL=story.controller.js.map