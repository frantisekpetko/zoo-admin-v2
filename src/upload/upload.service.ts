import { Injectable, Logger } from '@nestjs/common';
import { CommandsService } from '../commands/commands.service';

@Injectable()
export class UploadService {
  private logger: Logger = new Logger(`<${UploadService.name}>`);

  constructor(private commandsService: CommandsService) {}

  async upload() {
    await this.commandsService.deleteDataFromTables();
    await this.commandsService.storeData();
    await this.commandsService.createSeeds();
  }
}
