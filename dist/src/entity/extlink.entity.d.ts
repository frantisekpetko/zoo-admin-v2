import { BaseEntity } from 'typeorm';
import { Animal } from './animal.entity';
export declare class Extlink extends BaseEntity {
    id: number;
    link: string;
    animal: Animal;
}
