"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsService = void 0;
const common_1 = require("@nestjs/common");
const nest_console_1 = require("@squareboat/nest-console");
const fs = __importStar(require("fs"));
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const animal_entity_1 = require("../entity/animal.entity");
const image_entity_1 = require("../entity/image.entity");
const extlink_entity_1 = require("../entity/extlink.entity");
const user_entity_1 = require("../entity/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
let CommandsService = class CommandsService {
    async data() {
        await this.deleteDataFromTables();
        await this.storeData();
        await this.createSeeds();
        nest_console_1._cli.success('message');
    }
    async getImages() {
        const image_finder = require('image-search-engine');
        const downloadImage = (url, image_path) => (0, axios_1.default)({
            url,
            responseType: 'stream',
        }).then((response) => new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(image_path))
                .on('finish', () => resolve())
                .on('error', (e) => reject(e));
        }));
        const namesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/names.json'), 'utf8'));
        const latinnamesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/latinnames.json'), 'utf8'));
        const imagesObj = [];
        fs.rmSync((0, path_1.resolve)('./frontend/public/images'), {
            recursive: true,
            force: true,
        });
        fs.mkdir((0, path_1.resolve)('./frontend/public/images'), (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
        await Promise.all(latinnamesObj.map(async (animal, index) => {
            try {
                const url = await image_finder.find(animal, {
                    size: 'medium',
                });
                const imageName = `${animal}${(0, uuid_1.v4)()}.jpg`;
                await downloadImage(`${url}`, (0, path_1.resolve)(`./frontend/public/images/${imageName}`)).catch((e) => console.log('Error: ', e));
                imagesObj.push({
                    name: namesObj[index],
                    latinname: animal,
                    image: imageName,
                });
            }
            catch (error) {
                console.error('Error:', error);
            }
        }));
        fs.unlink('./src/data/seed/animals/images.json', function (err) {
            if (err)
                throw err;
            console.log('images.json deleted!');
        });
        fs.open('./src/data/seed/animals/images.json', 'w', function (err, file) {
            if (err)
                throw err;
            console.log('Saved!');
        });
        fs.writeFileSync('./src/data/seed/animals/images.json', JSON.stringify(imagesObj, null, 4), 'utf8');
    }
    async createAnimalJSONfile() {
        const imagesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/images.json'), 'utf8'));
        nest_console_1._cli.info(JSON.stringify(imagesObj));
        const wiki = require('wikijs').default;
        const animalObj = [];
        try {
            await Promise.all(imagesObj.map(async (data) => {
                try {
                    let content = [];
                    nest_console_1._cli.info('Inside the Promise');
                    wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
                        .page(data.name)
                        .then(async (page) => {
                        nest_console_1._cli.success('Inside Wiki');
                        content = await page.chain().summary().extlinks().request();
                        animalObj.push({
                            name: data.name,
                            latinname: data.latinname,
                            image: data.image,
                            extract: content.extract,
                            extlinks: [...content.extlinks],
                        });
                    })
                        .catch((e) => nest_console_1._cli.error(e))
                        .finally(() => {
                        nest_console_1._cli.info(JSON.stringify(animalObj));
                        fs.writeFile('./src/data/seed/animals/animals.json', JSON.stringify(animalObj, null, 4), 'utf8', () => console.log('Mkdir Done'));
                    });
                }
                catch (e) {
                    console.error('Error: ', e);
                }
                finally {
                }
            }));
        }
        catch (e) {
            console.error(e);
        }
    }
    async deleteDataFromTables() {
        const conn = (0, typeorm_1.getConnection)();
        const entities = conn.entityMetadatas;
        for (const entity of entities) {
            const repository = conn.getRepository(entity.name);
            await repository.clear();
        }
    }
    async storeData() {
        const animalsObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/animals.json'), 'utf8'));
        nest_console_1._cli.success(JSON.stringify(animalsObj));
        for (const _animal of animalsObj) {
            const animal = new animal_entity_1.Animal();
            animal.name = _animal.name;
            animal.latinname = _animal.latinname;
            animal.description = _animal.extract;
            const image = new image_entity_1.Image();
            image.urlName = _animal.image;
            nest_console_1._cli.info(_animal.image);
            try {
                await image.save();
            }
            catch (e) {
                nest_console_1._cli.error(e);
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
                    nest_console_1._cli.error(e);
                }
                animal.extlinks.push(extLink);
            }
            try {
                await animal.save();
            }
            catch (e) {
                nest_console_1._cli.error(e);
            }
        }
    }
    async createSeeds() {
        const salt = await bcrypt.genSalt();
        const user = new user_entity_1.User();
        user.username = 'user';
        user.salt = salt;
        user.password = await bcrypt.hash('123456', salt);
        try {
            await user.save();
            nest_console_1._cli.success('success');
        }
        catch (error) {
            if (error.errno === 19) {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
};
__decorate([
    (0, nest_console_1.Command)('data', {
        desc: 'Get images from Internet',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommandsService.prototype, "data", null);
__decorate([
    (0, nest_console_1.Command)('animal:json', {
        desc: 'Get images from Internet',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommandsService.prototype, "createAnimalJSONfile", null);
__decorate([
    (0, nest_console_1.Command)('store:data', {
        desc: 'Store intial data',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommandsService.prototype, "storeData", null);
__decorate([
    (0, nest_console_1.Command)('seeds', {
        desc: 'Create seeds',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommandsService.prototype, "createSeeds", null);
CommandsService = __decorate([
    (0, common_1.Injectable)()
], CommandsService);
exports.CommandsService = CommandsService;
//# sourceMappingURL=commands.service.js.map