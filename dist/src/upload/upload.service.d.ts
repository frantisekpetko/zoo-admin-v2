import { CommandsService } from '../commands/commands.service';
export declare class UploadService {
    private commandsService;
    private logger;
    constructor(commandsService: CommandsService);
    runScript(scriptPath: any, callback: any): void;
    upload(): Promise<void>;
}
