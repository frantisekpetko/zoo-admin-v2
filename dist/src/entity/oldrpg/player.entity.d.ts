import { BaseEntity } from 'typeorm';
export declare class Player extends BaseEntity {
    id: number;
    name: string;
    characterName: string;
    createdAt: Date;
    updatedAt: Date;
}
