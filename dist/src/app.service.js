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
exports.AppService = void 0;
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const nest_console_1 = require("@squareboat/nest-console");
const typeorm_1 = require("typeorm");
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const animal_entity_1 = require("./entity/animal.entity");
const extlink_entity_1 = require("./entity/extlink.entity");
const image_entity_1 = require("./entity/image.entity");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = __importStar(require("bcrypt"));
let AppService = class AppService {
    constructor() {
        this.imagesObj = [];
        this.imagesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/images.json'), 'utf8'));
    }
    async prepareApp() {
        await this.getImagesFromInternet();
        await this.storeData();
        await this.createSeeds();
    }
    async getImagesFromInternet() {
        const image_finder = require('image-search-engine');
        const namesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/names.json'), 'utf8'));
        const latinnamesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/latinnames.json'), 'utf8'));
        const descriptionObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/description.json'), 'utf8'));
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
        const downloadImage = (url, image_path) => (0, axios_1.default)({
            url,
            responseType: 'stream',
        }).then((response) => new Promise((resolve, reject) => {
            response.data
                .pipe(fs.createWriteStream(image_path))
                .on('finish', () => resolve())
                .on('error', (e) => reject(e));
        }));
        await Promise.all(latinnamesObj.map(async (animal, index) => {
            try {
                const url = await image_finder.find(namesObj[index], {
                    size: 'medium',
                });
                const imageName = `${latinnamesObj[index]}${(0, uuid_1.v4)()}.jpg`;
                await downloadImage(`${url}`, (0, path_1.resolve)(`./frontend/public/images/${imageName}`)).catch((e) => console.log('Error: ', e));
                imagesObj.push({
                    name: descriptionObj[index],
                    latinname: latinnamesObj[index],
                    image: imageName,
                });
            }
            catch (error) {
                console.error('Error:', error);
            }
        }));
        fs.writeFileSync('./src/data/seed/animals/images.json', JSON.stringify(imagesObj, null, 4), 'utf8');
        await this.prepareJSON();
    }
    async prepareJSON() {
        try {
            await Promise.all(this.imagesObj.map(async (animal, index) => {
                await this.prepareData(animal, index);
            }));
        }
        catch (e) { }
    }
    async prepareData(data, index) {
        const wiki = require('wikijs').default;
        const latinnamesObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/latinnames.json'), 'utf8'));
        const descriptionObj = [];
        const extLinksObj = [];
        try {
            console.log(data);
            let content = {};
            const extLinksContent = {};
            wiki({ apiUrl: 'https://cz.wikipedia.org/w/api.php' })
                .page(data.latinname)
                .then(async (page) => {
                content = await page.chain().summary().extlinks().request();
                descriptionObj.push({
                    name: data.name,
                    latinname: data.latinname,
                    extract: content.extract,
                });
                extLinksObj.push({
                    name: data,
                    latinname: data.latinname,
                    extlinks: [...content.extlinks],
                });
                console.log('ContentImage', content);
            })
                .catch((e) => console.log('Error: ', e))
                .finally(() => {
                fs.writeFile('./src/data/seed/animals/extlinks.json', JSON.stringify(extLinksObj, null, 4), 'utf8', () => console.log('Mkdir Images Done'));
                fs.writeFile('./src/data/seed/animals/description.json', JSON.stringify(descriptionObj, null, 4), 'utf8', () => console.log('Mkdir Done'));
            });
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }
    async storeData() {
        const animalsObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/animals.json'), 'utf8'));
        const conn = (0, typeorm_1.getConnection)();
        const entities = (0, typeorm_1.getConnection)().entityMetadatas;
        for (const entity of entities) {
            const repository = (0, typeorm_1.getConnection)().getRepository(entity.name);
            await repository.clear();
        }
        for (const _animal of animalsObj) {
            const animal = new animal_entity_1.Animal();
            animal.name = _animal.name;
            animal.latinname = _animal.latinname;
            animal.description = _animal.extract;
            const image = new image_entity_1.Image();
            image.urlName = _animal.image;
            await conn.manager.save(image);
            animal.images = [image];
            animal.extlinks = [];
            for (const extlink of _animal.extlinks) {
                const extLink = new extlink_entity_1.Extlink();
                extLink.link = extlink;
                await conn.manager.save(extLink);
                animal.extlinks.push(extLink);
            }
            await conn.manager.save(animal);
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
    (0, nest_console_1.Command)('prepare:app', {
        desc: 'Get images from Internet',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppService.prototype, "prepareApp", null);
__decorate([
    (0, nest_console_1.Command)('get:images', {
        desc: 'Get images from Internet',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppService.prototype, "getImagesFromInternet", null);
__decorate([
    (0, nest_console_1.Command)('store:datas', {
        desc: 'Store intial data',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppService.prototype, "storeData", null);
__decorate([
    (0, nest_console_1.Command)('seeds', {
        desc: 'Create seeds',
        args: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppService.prototype, "createSeeds", null);
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map