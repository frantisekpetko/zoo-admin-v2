"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const commands_service_1 = require("../commands/commands.service");
let UploadService = UploadService_1 = class UploadService {
    constructor(commandsService) {
        this.commandsService = commandsService;
        this.logger = new common_1.Logger(`<${UploadService_1.name}>`);
    }
    runScript(scriptPath, callback) {
        const childProcess = require('child_process');
        let invoked = false;
        const process = childProcess.fork(scriptPath);
        process.on('error', function (err) {
            if (invoked)
                return;
            invoked = true;
            callback(err);
        });
        process.on('exit', function (code) {
            if (invoked)
                return;
            invoked = true;
            const err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
    }
    async upload() {
        await this.commandsService.deleteDataFromTables();
        await this.commandsService.storeData();
        await this.commandsService.createSeeds();
    }
};
UploadService = UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [commands_service_1.CommandsService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map