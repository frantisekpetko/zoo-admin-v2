import { Trait } from '../entity/old/trait.entity';
import { CreateTraitsDto } from './dto/store-traits.dto';
import { TraitRepository } from './trait.repository';
export declare class TraitsService {
    private traitRepository;
    constructor(traitRepository: TraitRepository);
    getTraits(): Promise<Trait[]>;
    storeInitialData(createTraitsDto: CreateTraitsDto): Promise<Trait>;
}
