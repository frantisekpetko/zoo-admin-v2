import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AppService } from './app.service';
import { ConsoleModule } from '@squareboat/nest-console';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AnimalsModule } from './animals/animals.module';
import { root } from './config/paths';
import { CommandsModule } from './commands/commands.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/frontend/${process.env.NODE_ENV === 'development' ? 'public' : 'dist'}`,
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ConsoleModule,
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    AnimalsModule,
    CommandsModule,
    UploadModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {}
