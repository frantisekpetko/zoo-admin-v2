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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const animal_entity_1 = require("./entity/animal.entity");
const image_entity_1 = require("./entity/image.entity");
const extlink_entity_1 = require("./entity/extlink.entity");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const fs = __importStar(require("fs"));
async function bootstrap() {
    const logger = new common_2.Logger('<Bootstrap>');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    logger.log(process.version, 'NodeJS version');
    logger.log((0, path_1.resolve)('../../frontend/dist'));
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    await animalsData();
    await userSeeds();
    app.setGlobalPrefix('api');
    var config = require('config');
    const serverConfig = config.get('server');
    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
async function deleteData() {
    const conn = (0, typeorm_1.getConnection)();
    const entities = conn.entityMetadatas;
    for (const entity of entities) {
        const repository = conn.getRepository(entity.name);
        await repository.clear();
    }
}
async function animalsData() {
    const animalsObj = JSON.parse(fs.readFileSync((0, path_1.resolve)('./src/data/seed/animals/animals.json'), 'utf8'));
    for (const _animal of animalsObj) {
        const animal = new animal_entity_1.Animal();
        animal.name = _animal.name;
        animal.latinname = _animal.latinname;
        animal.description = _animal.extract;
        const image = new image_entity_1.Image();
        image.urlName = _animal.image;
        try {
            await image.save();
        }
        catch (e) { }
        animal.images = [image];
        animal.extlinks = [];
        for (const extlink of _animal.extlinks) {
            const extLink = new extlink_entity_1.Extlink();
            extLink.link = extlink;
            try {
                await extLink.save();
            }
            catch (e) { }
            animal.extlinks.push(extLink);
        }
        try {
            await animal.save();
        }
        catch (e) { }
    }
}
async function userSeeds() {
    const salt = await bcrypt.genSalt();
    const user = new user_entity_1.User();
    user.username = 'user';
    user.salt = salt;
    user.password = await bcrypt.hash('123456', salt);
    try {
        await user.save();
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
//# sourceMappingURL=main.js.map