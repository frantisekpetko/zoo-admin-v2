import { Trait } from '../entity/old/trait.entity';
import { CreateTraitsDto } from './dto/store-traits.dto';
import { TraitsService } from './traits.service';
export declare class TraitsController {
    private traitsService;
    private logger;
    constructor(traitsService: TraitsService);
    gettraits(): Promise<Trait[]>;
    getInitialData(createTraitsDto: CreateTraitsDto): Promise<Trait>;
}
