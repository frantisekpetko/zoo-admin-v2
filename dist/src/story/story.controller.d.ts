import { Story } from '../entity/old/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { StoryService } from './story.service';
export declare class StoryController {
    private storyService;
    constructor(storyService: StoryService);
    getAllStories(): Promise<Story[]>;
    createStoryWithoutRelationship(createStoryDto: CreateStoryDto): Promise<void>;
}
