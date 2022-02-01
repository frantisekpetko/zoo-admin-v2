import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { root } from './paths';

console.log('Root ' + root + '/../../animals.js');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: root + `/data/database.sqlite`,
  logging: true,
  autoLoadEntities: true,
  synchronize: true,
  //entities: ["src/entity/**/*.ts"],
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
