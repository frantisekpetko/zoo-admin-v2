import { BaseEntity } from 'typeorm';
import { Animal } from './animal.entity';
export declare class Image extends BaseEntity {
    id: number;
    urlName: string;
    animal: Animal;
}
