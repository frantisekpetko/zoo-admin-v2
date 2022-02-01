import { Choice } from '../entity/old/choice.entity';
import { ChoiceService } from './choice.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
export declare class ChoiceController {
    private choiceService;
    constructor(choiceService: ChoiceService);
    getChoices(): Promise<Choice[]>;
    createChoiceWithoutRelationship(createChoiceDto: CreateChoiceDto): Promise<void>;
}
