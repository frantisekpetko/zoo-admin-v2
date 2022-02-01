import { BaseEntity } from 'typeorm';
export declare class Trait extends BaseEntity {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
