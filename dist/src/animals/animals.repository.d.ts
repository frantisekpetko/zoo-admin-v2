import { Repository } from 'typeorm';
import { Animal } from '../entity/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
export declare class AnimalRepository extends Repository<Animal> {
    private logger;
    getPagesNumber(limit: number, search: string): Promise<number>;
    getAll(page: number, limit: number, search: string): Promise<Animal[]>;
    findOne(id: any): Promise<Animal>;
    removeOne(id: any): Promise<void>;
    createOne(createAnimalDto: CreateAnimalDto): Promise<void>;
    updateRecord(id: number, updateAnimalDto: UpdateAnimalDto): Promise<void>;
}
