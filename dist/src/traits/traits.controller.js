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
exports.TraitsController = void 0;
const common_1 = require("@nestjs/common");
const store_traits_dto_1 = require("./dto/store-traits.dto");
const traits_service_1 = require("./traits.service");
let TraitsController = class TraitsController {
    constructor(traitsService) {
        this.traitsService = traitsService;
        this.logger = new common_1.Logger('TraitsController');
    }
    gettraits() {
        return this.traitsService.getTraits();
    }
    getInitialData(createTraitsDto) {
        return this.traitsService.storeInitialData(createTraitsDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TraitsController.prototype, "gettraits", null);
__decorate([
    (0, common_1.Post)('/data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_traits_dto_1.CreateTraitsDto]),
    __metadata("design:returntype", Promise)
], TraitsController.prototype, "getInitialData", null);
TraitsController = __decorate([
    (0, common_1.Controller)('traits'),
    __metadata("design:paramtypes", [traits_service_1.TraitsService])
], TraitsController);
exports.TraitsController = TraitsController;
//# sourceMappingURL=traits.controller.js.map