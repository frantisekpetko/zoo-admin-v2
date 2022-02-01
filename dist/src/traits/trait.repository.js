"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraitRepository = void 0;
const trait_entity_1 = require("../entity/old/trait.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let TraitRepository = class TraitRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('TraitRepository');
    }
    async getTraits() {
        const query = this.createQueryBuilder('trait');
        try {
            const traits = await query.getMany();
            return traits;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for traits`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async storeInitialData(createTraitsDto) {
        const query = (0, typeorm_1.getRepository)(trait_entity_1.Trait);
        this.logger.log('createTratDto', JSON.stringify(createTraitsDto));
        let item = null;
        let id = null;
        try {
            function simpleStringify(object) {
                var simpleObject = {};
                for (var prop in object) {
                    if (!object.hasOwnProperty(prop)) {
                        continue;
                    }
                    if (typeof object[prop] == 'object') {
                        continue;
                    }
                    if (typeof object[prop] == 'function') {
                        continue;
                    }
                    simpleObject[prop] = object[prop];
                }
                return JSON.stringify(simpleObject);
            }
            await (0, typeorm_1.getRepository)(trait_entity_1.Trait).save(createTraitsDto);
            item = await (0, typeorm_1.getRepository)(trait_entity_1.Trait).find({
                order: {
                    id: 'DESC',
                },
                take: 1,
            });
            this.logger.log('item');
        }
        catch (e) {
            this.logger.error(e);
        }
        return item[0];
    }
};
TraitRepository = __decorate([
    (0, typeorm_1.EntityRepository)(trait_entity_1.Trait)
], TraitRepository);
exports.TraitRepository = TraitRepository;
//# sourceMappingURL=trait.repository.js.map