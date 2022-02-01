import { Repository } from 'typeorm';
import { Story } from '../entity/old/story.entity';
import { CreateStoryDto } from './dto/create-story.dto';
export declare class StoryRepository extends Repository<Story> {
    private logger;
    getAllStories(): Promise<Story[]>;
    createStoryWithoutRelationship(createStoryDto: CreateStoryDto): Promise<void>;
}
