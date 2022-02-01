"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const paths_1 = require("./paths");
console.log('Root ' + paths_1.root + '/../../animals.js');
exports.typeOrmConfig = {
    type: 'sqlite',
    database: paths_1.root + `/data/database.sqlite`,
    logging: true,
    autoLoadEntities: true,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
//# sourceMappingURL=typeorm.config.js.map