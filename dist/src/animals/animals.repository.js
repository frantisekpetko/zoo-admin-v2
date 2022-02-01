"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AnimalRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const animal_entity_1 = require("../entity/animal.entity");
const image_entity_1 = require("../entity/image.entity");
const extlink_entity_1 = require("../entity/extlink.entity");
let AnimalRepository = AnimalRepository_1 = class AnimalRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(`<${AnimalRepository_1.name}>`);
    }
    async getPagesNumber(limit, search) {
        const queryLength = this.createQueryBuilder('animal');
        if (search !== '') {
            queryLength
                .select([
                'animal.id',
                'animal.name',
                'animal.latinname',
                'animal.createdAt',
                'animal.updatedAt',
            ])
                .innerJoinAndSelect(`animal.images`, 'image')
                .where('animal.name like :name', { name: `%${search}%` })
                .orWhere('animal.latinname like :name', { name: `%${search}%` });
        }
        else {
            queryLength
                .select([
                'animal.id',
                'animal.name',
                'animal.latinname',
                'animal.createdAt',
                'animal.updatedAt',
            ])
                .innerJoinAndSelect(`animal.images`, 'image');
        }
        try {
            const animalsLength = await queryLength.getMany();
            this.logger.log(animalsLength.length, 'animalsLength');
            return animalsLength.length !== 0
                ? Math.ceil(animalsLength.length / limit) - 1
                : animalsLength.length;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for animals`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getAll(page, limit, search) {
        const query = this.createQueryBuilder('animal');
        if (search !== '') {
            query
                .select([
                'animal.id',
                'animal.name',
                'animal.latinname',
                'animal.createdAt',
                'animal.updatedAt',
            ])
                .innerJoinAndSelect(`animal.images`, 'image')
                .where('lower(animal.name) like :name', { name: `%${search}%` })
                .orWhere('lower(animal.latinname) like :name', { name: `%${search}%` });
        }
        else {
            query
                .select([
                'animal.id',
                'animal.name',
                'animal.latinname',
                'animal.createdAt',
                'animal.updatedAt',
            ])
                .innerJoinAndSelect(`animal.images`, 'image');
        }
        try {
            const animals = await query
                .skip(page === 1 ? 0 : page * limit)
                .take(limit)
                .getMany();
            return animals;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for animals`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async findOne(id) {
        const query = this.createQueryBuilder('animal');
        query
            .where('animal.id = :animalId', { animalId: id })
            .innerJoinAndSelect(`animal.images`, 'image')
            .innerJoinAndSelect('animal.extlinks', 'extlink');
        try {
            const animal = await query.getOne();
            return animal;
        }
        catch (error) {
            this.logger.error(`Failed to get tasks for animals`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async removeOne(id) {
        this.logger.log(`${id}`);
        const connection = await (0, typeorm_1.getConnection)();
        await connection.query('PRAGMA foreign_keys=OFF');
        await (0, typeorm_1.getConnection)().createQueryBuilder()
            .delete()
            .from(animal_entity_1.Animal)
            .where("id = :id", { id: id })
            .execute();
        await connection.query('PRAGMA foreign_keys=ON');
    }
    async createOne(createAnimalDto) {
        const defaultImage = '';
        const _animal = createAnimalDto;
        this.logger.log(JSON.stringify(createAnimalDto));
        const animal = new animal_entity_1.Animal();
        animal.name = _animal.name;
        animal.latinname = _animal.latinname;
        animal.description = _animal.description;
        const image = new image_entity_1.Image();
        image.urlName = defaultImage;
        try {
            await image.save();
        }
        catch (e) {
            this.logger.log(e);
        }
        animal.images = [image];
        animal.extlinks = [];
        for (const extlink of _animal.extlinks) {
            const extLink = new extlink_entity_1.Extlink();
            extLink.link = extlink;
            try {
                await extLink.save();
            }
            catch (e) {
                this.logger.log(e);
            }
            animal.extlinks.push(extLink);
        }
        try {
            await animal.save();
        }
        catch (e) {
            this.logger.log(e);
        }
    }
    async updateRecord(id, updateAnimalDto) {
        const animal = await this.findOne(id);
        animal.name = updateAnimalDto.name;
        animal.latinname = updateAnimalDto.latinname;
        animal.description = updateAnimalDto.description;
        animal.extlinks = [];
        for (const extlink of updateAnimalDto.extlinks) {
            const extLink = new extlink_entity_1.Extlink();
            extLink.link = extlink;
            try {
                await extLink.save();
            }
            catch (e) {
                this.logger.log(e);
            }
            animal.extlinks.push(extLink);
        }
        try {
            await (0, typeorm_1.getConnection)().getRepository(animal_entity_1.Animal).save(animal);
        }
        catch (e) {
            this.logger.log(e);
        }
    }
};
AnimalRepository = AnimalRepository_1 = __decorate([
    (0, typeorm_1.EntityRepository)(animal_entity_1.Animal)
], AnimalRepository);
exports.AnimalRepository = AnimalRepository;
//# sourceMappingURL=animals.repository.js.map