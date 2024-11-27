import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../entity/animal.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  private logger: Logger = new Logger(`<${AnimalsController.name}>`);

  @Post()
  //@UseGuards(AuthGuard())
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }
  @Get('/pages')
  //@UseGuards(AuthGuard())
  async getPagesNumber(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 12,
    @Query('search') search: string,
  ): Promise<number> {
    return this.animalsService.getPagesNumber(limit, search);
  }

  @Get()
  //@UseGuards(AuthGuard())
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 12,
    @Query('search') search: string
  ): Promise<Animal[]> {
    return this.animalsService.findAll(page, limit, search);
  }

  @Get(':id')
  //@UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Patch(':id')
  //@UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  //@UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    this.logger.log(`${id}`);
    return this.animalsService.remove(+id);
  }

  @Post('/file')
  //@UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: `${process.cwd()}/frontend/${
          process.env.NODE_ENV === 'development' ? 'public/' : 'dist/'
        }/images`,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() image: Express.Multer.File) {
    return { image: image.filename };
  }
}
