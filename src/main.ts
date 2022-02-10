import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
//import * as config from 'config';
import { resolve } from 'path';
import { Animal } from './entity/animal.entity';
import { Image } from './entity/image.entity';
import { Extlink } from './entity/extlink.entity';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger('<Bootstrap>');
  const app = await NestFactory.create(AppModule);
  logger.log(process.version, 'NodeJS version');

 
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await deleteData();
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
  const conn = getConnection();

  const entities = conn.entityMetadatas;

  for (const entity of entities) {
    const repository = conn.getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  }
}

async function animalsData() {
  const animalsObj = JSON.parse(
    fs.readFileSync(resolve('./src/data/seed/animals/animals.json'), 'utf8'),
  );

  for (const _animal of animalsObj) {
    //const index = animalsObj.indexOf(_animal);
    const animal = new Animal();
    animal.name = _animal.name;
    animal.latinname = _animal.latinname;
    animal.description = _animal.extract;
    const image = new Image();
    image.urlName = _animal.image;

    try {
      await image.save();
    } catch (e) {}

    //await conn.manager.save(image);

    animal.images = [image];
    //console.log(animal.images);
    animal.extlinks = [];

    for (const extlink of _animal.extlinks) {
      const extLink = new Extlink();
      extLink.link = extlink;
      try {
        await extLink.save();
      } catch (e) {}

      //await conn.manager.save(extLink);
      animal.extlinks.push(extLink);
    }
    //console.log(animal.extlinks);
    //await conn.manager.save(animal);
    try {
      await animal.save();
    } catch (e) {}
  }
}

async function userSeeds() {
  const salt = await bcrypt.genSalt();

  const user = new User();

  user.username = 'user';
  user.salt = salt;
  user.password = await bcrypt.hash('123456', salt);

  try {
    await user.save();
  } catch (error) {
    if (error.errno === 19) {
      throw new ConflictException('Username already exists');
    } else {
      throw new InternalServerErrorException();
    }
  }
}
