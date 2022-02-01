import { BaseEntity } from 'typeorm';
import { Image } from './image.entity';
import { Extlink } from './extlink.entity';
export declare class Animal extends BaseEntity {
    id: number;
    name: string;
    latinname: string;
    description: string;
    images: Image[];
    extlinks: Extlink[];
    createdAt: Date;
    updatedAt: Date;
}
