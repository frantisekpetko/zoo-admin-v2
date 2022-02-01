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
var AnimalsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const animals_repository_1 = require("./animals.repository");
let AnimalsService = AnimalsService_1 = class AnimalsService {
    constructor(animalRepository) {
        this.animalRepository = animalRepository;
        this.logger = new common_1.Logger(`<${AnimalsService_1.name}>`);
    }
    create(createAnimalDto) {
        return this.animalRepository.createOne(createAnimalDto);
    }
    async getPagesNumber(limit, search) {
        return this.animalRepository.getPagesNumber(limit, search);
    }
    findAll(page, limit, search) {
        return this.animalRepository.getAll(page, limit, search);
    }
    findOne(id) {
        this.logger.log(`This action returns a #${id} animal`);
        return this.animalRepository.findOne(+id);
    }
    update(id, updateAnimalDto) {
        return this.animalRepository.updateRecord(id, updateAnimalDto);
    }
    remove(id) {
        this.logger.log(`${id}`);
        return this.animalRepository.removeOne(id);
    }
};
AnimalsService = AnimalsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(animals_repository_1.AnimalRepository)),
    __metadata("design:paramtypes", [animals_repository_1.AnimalRepository])
], AnimalsService);
exports.AnimalsService = AnimalsService;
//# sourceMappingURL=animals.service.js.map