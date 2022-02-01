import { BaseEntity } from 'typeorm';
import { Choice } from './choice.entity';
export declare class Story extends BaseEntity {
    id: number;
    title: string;
    text: string;
    choices: Choice[];
    createdAt: Date;
    updatedAt: Date;
}
