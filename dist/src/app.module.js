"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_module_1 = require("./tasks/tasks.module");
const auth_module_1 = require("./auth/auth.module");
const shared_module_1 = require("./shared/shared.module");
const traits_module_1 = require("./traits/traits.module");
const typeorm_config_1 = require("./config/typeorm.config");
const choice_module_1 = require("./choice/choice.module");
const story_module_1 = require("./story/story.module");
const app_service_1 = require("./app.service");
const nest_console_1 = require("@squareboat/nest-console");
const serve_static_1 = require("@nestjs/serve-static");
const config_1 = require("@nestjs/config");
const animals_module_1 = require("./animals/animals.module");
const paths_1 = require("./config/paths");
const commands_module_1 = require("./commands/commands.module");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: paths_1.root + '/../../frontend/dist',
                exclude: ['/api*'],
            }),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            nest_console_1.ConsoleModule,
            tasks_module_1.TasksModule,
            auth_module_1.AuthModule,
            shared_module_1.SharedModule,
            traits_module_1.TraitsModule,
            choice_module_1.ChoiceModule,
            story_module_1.StoryModule,
            config_1.ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
            animals_module_1.AnimalsModule,
            commands_module_1.CommandsModule,
            upload_module_1.UploadModule,
        ],
        providers: [app_service_1.AppService],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map