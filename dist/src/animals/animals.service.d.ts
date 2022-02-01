import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../entity/animal.entity';
import { AnimalRepository } from './animals.repository';
export declare class AnimalsService {
    private animalRepository;
    private logger;
    constructor(animalRepository: AnimalRepository);
    create(createAnimalDto: CreateAnimalDto): Promise<void>;
    getPagesNumber(limit: number, search: string): Promise<number>;
    findAll(page: number, limit: number, search: string): Promise<Animal[]>;
    findOne(id: number): Promise<Animal>;
    update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<void>;
    remove(id: number): Promise<void>;
}
