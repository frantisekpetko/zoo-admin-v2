import { BaseEntity } from 'typeorm';
import { Story } from './story.entity';
export declare class Choice extends BaseEntity {
    id: number;
    title: string;
    text: string;
    stories: Story;
    createdAt: Date;
    updatedAt: Date;
}
