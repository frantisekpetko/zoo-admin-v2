import { Repository } from 'typeorm';
import { Choice } from '../entity/old/choice.entity';
import { CreateChoiceDto } from './dto/create-choice.dto';
export declare class ChoiceRepository extends Repository<Choice> {
    private logger;
    getChoices(): Promise<Choice[]>;
    createChoiceWithoutRelationship(createChoiceDto: CreateChoiceDto): Promise<void>;
}
