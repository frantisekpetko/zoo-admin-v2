import { root } from './config/paths';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getConnection } from 'typeorm';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { Animal } from './entity/animal.entity';
import { Image } from './entity/image.entity';
import { Extlink } from './entity/extlink.entity';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import path from 'path';
import * as compression from 'compression';

async function bootstrap() {
  const logger = new Logger('<Bootstrap>');
  const app = await NestFactory.create(AppModule);
  logger.log(process.version, 'NodeJS version');

  app.use(compression());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  var config = require('config');
  const serverConfig = config.get('server');

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
