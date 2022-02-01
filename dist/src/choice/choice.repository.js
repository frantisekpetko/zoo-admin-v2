"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiceRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const choice_entity_1 = require("../entity/old/choice.entity");
let ChoiceRepository = class ChoiceRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ChoiceRepository');
    }
    async getChoices() {
        const query = this.createQueryBuilder('choice');
        const choices = await query.getMany();
        return choices;
    }
    async createChoiceWithoutRelationship(createChoiceDto) {
        const { text } = createChoiceDto;
        const choice = new choice_entity_1.Choice();
        choice.title = text;
        choice.text = text;
        try {
            await choice.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
ChoiceRepository = __decorate([
    (0, typeorm_1.EntityRepository)(choice_entity_1.Choice)
], ChoiceRepository);
exports.ChoiceRepository = ChoiceRepository;
//# sourceMappingURL=choice.repository.js.map