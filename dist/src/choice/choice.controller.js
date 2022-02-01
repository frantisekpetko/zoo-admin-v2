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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiceController = void 0;
const common_1 = require("@nestjs/common");
const choice_service_1 = require("./choice.service");
const create_choice_dto_1 = require("./dto/create-choice.dto");
let ChoiceController = class ChoiceController {
    constructor(choiceService) {
        this.choiceService = choiceService;
    }
    async getChoices() {
        return this.choiceService.getChoices();
    }
    async createChoiceWithoutRelationship(createChoiceDto) {
        return this.choiceService.createChoiceWithoutRelationship(createChoiceDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChoiceController.prototype, "getChoices", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_choice_dto_1.CreateChoiceDto]),
    __metadata("design:returntype", Promise)
], ChoiceController.prototype, "createChoiceWithoutRelationship", null);
ChoiceController = __decorate([
    (0, common_1.Controller)('choice'),
    __metadata("design:paramtypes", [choice_service_1.ChoiceService])
], ChoiceController);
exports.ChoiceController = ChoiceController;
//# sourceMappingURL=choice.controller.js.map