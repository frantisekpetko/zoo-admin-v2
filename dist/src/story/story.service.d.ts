import { CreateChoiceDto } from '../choice/dto/create-choice.dto';
import { Story } from '../entity/old/story.entity';
import { StoryRepository } from './story.repository';
export declare class StoryService {
    private storyRepository;
    constructor(storyRepository: StoryRepository);
    getAllStories(): Promise<Story[]>;
    createStoryWithoutRelationship(createStoryDto: CreateChoiceDto): Promise<void>;
}
