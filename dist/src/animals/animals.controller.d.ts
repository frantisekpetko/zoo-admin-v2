import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../entity/animal.entity';
export declare class AnimalsController {
    private readonly animalsService;
    constructor(animalsService: AnimalsService);
    private logger;
    create(createAnimalDto: CreateAnimalDto): Promise<void>;
    getPagesNumber(limit: number, search: string): Promise<number>;
    findAll(page: number, limit: number, search: string): Promise<Animal[]>;
    findOne(id: string): Promise<Animal>;
    update(id: string, updateAnimalDto: UpdateAnimalDto): Promise<void>;
    remove(id: string): Promise<void>;
}
