import { Choice } from '../entity/old/choice.entity';
import { ChoiceRepository } from './choice.repository';
import { CreateChoiceDto } from './dto/create-choice.dto';
export declare class ChoiceService {
    private choiceRepository;
    constructor(choiceRepository: ChoiceRepository);
    getChoices(): Promise<Choice[]>;
    createChoiceWithoutRelationship(createChoiceDto: CreateChoiceDto): Promise<void>;
}
