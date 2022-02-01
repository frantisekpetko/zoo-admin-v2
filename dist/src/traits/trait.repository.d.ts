import { Trait } from '../entity/old/trait.entity';
import { Repository } from 'typeorm';
import { CreateTraitsDto } from './dto/store-traits.dto';
export declare class TraitRepository extends Repository<Trait> {
    private logger;
    getTraits(): Promise<Trait[]>;
    storeInitialData(createTraitsDto: CreateTraitsDto): Promise<Trait>;
}
